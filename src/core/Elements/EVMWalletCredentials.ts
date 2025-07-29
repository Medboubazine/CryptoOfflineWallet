import type WalletCredentialsInterface from "@/core/Interfaces/Credentials/WalletCredentialsInterface";

export default class EVMWalletCredentials implements WalletCredentialsInterface {
    /**
     * Public Address
     * @var string
     */
    address: string;
    /**
     * Wallet private key
     * @var string
     */
    private_key: string;
    /**
     * Constructor
     * @param address 
     * @param private_key 
     */
    constructor(address:string,private_key:string) {
        this.address = address
        this.private_key = private_key
    }
}