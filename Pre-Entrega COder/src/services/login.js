//Variable booleana que luego sera un service al que consultar y se modificara su valor con un login...
class login {
    #isAdmin;
    constructor(){
        this.#isAdmin = false;
    }
    login (user, pass){
        if (user == "admin" && pass == "admin"){
            this.#isAdmin = true;
        }else{
            this.#isAdmin = false;
        }
        return this.#isAdmin;
    }
    isAdmin (){
        return this.#isAdmin;
    }
}
export default new login();