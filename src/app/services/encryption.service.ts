import * as CryptoJS from 'crypto-js';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
class Encryptor{
   // Code goes here
   keySize:number;
   ivSize:number;
   iterations:number;
   message:string;
   password:string;
   constructor(){
   this.keySize = 256;
   this.ivSize = 128;
   this.iterations = 100;

   this.message = "Hello World";
   this.password = ";^W{U^PD^+nU6IWBr,9mGrh&Y.Bd9?|[MlNBukW9@+M*CR1?6oKfd*&&g4[}~{pu)";
   }


encrypt (msg) {
  let pass = this.password;
 var salt = CryptoJS.lib.WordArray.random(128/8);

 var key = CryptoJS.PBKDF2(pass, salt, {
     keySize: this.keySize/32,
     iterations: this.iterations
   });

 var iv = CryptoJS.lib.WordArray.random(128/8);

 var encrypted = CryptoJS.AES.encrypt(msg, key, {
   iv: iv,
   padding: CryptoJS.pad.Pkcs7,
   mode: CryptoJS.mode.CBC

 });

 var transitmessage = salt.toString()+ iv.toString() + encrypted.toString();
 return transitmessage;
}

decrypt (transitmessage) {
  let pass = this.password;
 var salt = CryptoJS.enc.Hex.parse(transitmessage.substr(0, 32));
 var iv = CryptoJS.enc.Hex.parse(transitmessage.substr(32, 32))
 var encrypted = transitmessage.substring(64);

 var key = CryptoJS.PBKDF2(pass, salt, {
     keySize: this.keySize/32,
     iterations: this.iterations
   });

 var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
   iv: iv,
   padding: CryptoJS.pad.Pkcs7,
   mode: CryptoJS.mode.CBC

 })
 return decrypted;
}

}

export {Encryptor}