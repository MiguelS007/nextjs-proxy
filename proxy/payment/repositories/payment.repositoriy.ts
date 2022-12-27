import axios from "axios";

export class PaymentRepository {
    // responsável em se comunicar com a camada mais interna do negócio: Banco de dados, serviços internos ou externos...
    async get(): Promise<string> {
        return await axios.get("https://api.github.com/octocat")
            .then((res) => {
                return JSON.stringify(res.data);
            })
    }
}