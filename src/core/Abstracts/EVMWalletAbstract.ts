import type EVMWalletCredentialsInterface from "../Interfaces/Credentials/WalletCredentialsInterface";
import type ChainTokenInterface from "@/core/Interfaces/Tokens/ChainTokenInterface";
import type ChainInterface from "@/core/Interfaces/Chains/ChainInterface";
import EVMWalletCredentials from "@/core/Elements/EVMWalletCredentials";
import TransferSentElement from "@/core/Elements/TransferSentElement";
import BalanceElement from "@/core/Elements/BalanceElement";
import { ethers } from "ethers";
import TransferBuildElement from "../Elements/TransferBuildElement";

export default abstract class EVMWalletAbstract {
    /**
     * Chain (Network)
     * @var ChainInterface
     */
    _CHAIN: ChainInterface;
    /**
     * RPC provider
     * @var object
     */
    _PROVIDER;
    /**
     * Constructor
     */
    constructor(chain: ChainInterface) {
        this._PROVIDER = new ethers.JsonRpcProvider(chain.rpc);
        this._CHAIN = chain;
    }
    /**
     * Create new wallet on BSC network
     * @returns EVMWalletCredentials|null
     */
    create(): EVMWalletCredentialsInterface{
        const WALLET = ethers.Wallet.createRandom();
        
        return new EVMWalletCredentials(WALLET.address,WALLET.privateKey);
    }
    /**
     * Check wallet balance
     * @param wallet_address
     * @returns 
     */
    async balance(wallet_address: string): Promise<BalanceElement> {
        const balance = await this._PROVIDER.getBalance(wallet_address);
            
        return new BalanceElement(ethers.formatEther(balance),this._CHAIN.currency);
    }
    /**
     * Check wallet token balance
     * @param token_address 
     * @param wallet_address 
     * @returns 
     */
    async balance_token(token_address: ChainTokenInterface,wallet_address: string): Promise<BalanceElement>{

        const CHAIN_ABI = [
            this._CHAIN.contracts().BALANCE_OF,
            this._CHAIN.contracts().DECIMALS,
            this._CHAIN.contracts().SYMBOL,
        ];

        const TOKEN_CONTRACT = new ethers.Contract(token_address.contract_address, CHAIN_ABI, this._PROVIDER);

        const [_BALANCE, _DECIMALS, _SYMBOL] = await Promise.all([
            TOKEN_CONTRACT.balanceOf(wallet_address),
            TOKEN_CONTRACT.decimals(),
            TOKEN_CONTRACT.symbol()
        ]);

        const FORMATTED_BALANCE = ethers.formatUnits(_BALANCE, _DECIMALS);

        return new BalanceElement(FORMATTED_BALANCE,_SYMBOL);
    }
    /**
     * Transfer chain base currency
     * @param from_wallet 
     * @param recipient 
     * @param amount 
     * @returns {Promise<TransferSentElement>}
     */
    async transfer(from_wallet: EVMWalletCredentials,recipient: string,amount: string): Promise<TransferSentElement>{
        //
        // BUILD TRANSFER
        //
        const transfer_build = await this.transfer_build(from_wallet,recipient,amount);
        //
        // SIGN TRANSFER WITH WALLET PRIVATE KEY
        //
        const TX = await this.transfer_sign(from_wallet,transfer_build);
        //
        // SEND TRANSFER TO CHAIN
        //
        const transfer = await this.transfer_send(TX);
        //
        // Return result
        //
        return transfer;
    }
    /**
     * Transfer chain token
     * @param token_address 
     * @param from_wallet 
     * @param recipient 
     * @param amount 
     * @returns {Promise<TransferSentElement>}
     */
    async transfer_token(token_address: ChainTokenInterface,from_wallet: EVMWalletCredentials,recipient:string,amount: string): Promise<TransferSentElement>{
        //
        // BUILD TRANSFER
        //
        const transfer_build = await this.transfer_token_build(token_address,from_wallet,recipient,amount);
        //
        // SIGN TRANSFER WITH WALLET PRIVATE KEY
        //
        const TX = await this.transfer_sign(from_wallet,transfer_build);
        //
        // SEND TRANSFER TO CHAIN
        //
        const transfer = await this.transfer_send(TX);
        //
        // Return result
        //
        return transfer;
    }
    /**
     * Build chain base currency transfer
     * @param wallet 
     * @param recipient 
     * @param amount 
     * @returns 
     */
    async transfer_build(wallet: EVMWalletCredentials,recipient:string,amount: string) : Promise<TransferBuildElement>{
        
        const [_NOUNCE,_GAS_PRICE] = await Promise.all([
                    this._PROVIDER.getTransactionCount(wallet.address),
                    this._PROVIDER.send("eth_gasPrice", [])
            ]);

        return new TransferBuildElement(
                _NOUNCE,
                recipient,
                ethers.parseUnits(amount, this._CHAIN.decimals),
                this._CHAIN.gas,
                _GAS_PRICE,
                null,
                this._CHAIN.id,
            );
    }
    /**
     * Build chain token transfer
     * @param token 
     * @param wallet 
     * @param recipient 
     * @param amount 
     * @returns {Promise<TransferBuildElement>}
     */
    async transfer_token_build(token: ChainTokenInterface,wallet: EVMWalletCredentials,recipient:string,amount: string): Promise<TransferBuildElement>{
        const ABI = [
            this._CHAIN.contracts().DECIMALS,
            this._CHAIN.contracts().TRANSFER,
        ];

        const TOKEN_CONTRACT = new ethers.Contract(token.contract_address, ABI, this._PROVIDER);

        const [_DECIMALS,_NOUNCE,_GAS_PRICE] = await Promise.all([
                TOKEN_CONTRACT.decimals(),
                this._PROVIDER.getTransactionCount(wallet.address),
                this._PROVIDER.send("eth_gasPrice", [])
            ]);

        const PARSED_AMOUNT = ethers.parseUnits(amount, _DECIMALS);

        const INTERFACE = new ethers.Interface(ABI);

        const TRANSFER_DATA = INTERFACE.encodeFunctionData("transfer", [recipient, PARSED_AMOUNT]);

        return new TransferBuildElement(
            _NOUNCE,
            token.contract_address,
            '0x0',//Mean 0
            this._CHAIN.gas,
            _GAS_PRICE,
            TRANSFER_DATA,
            this._CHAIN.id,
        );
    }
    /**
     * Sign transfer with private key
     * @param wallet 
     * @param transfer_build 
     * @returns {Promise<string>}
     */
    async transfer_sign(wallet: EVMWalletCredentials,transfer_build: TransferBuildElement): Promise<string>{
        const WALLET = new ethers.Wallet(wallet.private_key);

        const TX: { [key: string]: any } = {
            nonce: transfer_build.nonce,
            to: transfer_build.to,
            value: transfer_build.value,
            gasLimit: transfer_build.gas_limit,
            gasPrice: transfer_build.gas_price,
            chainId: transfer_build.chain_id,
        }

        if (transfer_build.data !== null) {
            TX.data = transfer_build.data
        }

        const SIGNED_TX = await WALLET.signTransaction(TX);
        return SIGNED_TX;
    }
    /**
     * Send signed transfer to blockchain
     * @param TX 
     * @returns {Promise<TransferSentElement>}
     */
    async transfer_send(TX: string): Promise<TransferSentElement> {
        const RESPONSE = await this._PROVIDER.broadcastTransaction(TX);

        return new TransferSentElement(
                RESPONSE.hash,
                RESPONSE.from,
                RESPONSE.to,
                RESPONSE.value,
        );
    }
}