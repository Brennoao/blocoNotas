import { db } from "../../services/firebase"
import { child, get, ref, set } from "firebase/database"
import { v4 } from "uuid"

export default function handler(req, res) {
    try {
        if (req.method == 'GET') {
            get(child(ref(db), 'datainfos')).then(snapshot => {
                const retorno = []
                snapshot.forEach(item => {
                    retorno.push(item.val())
                })
                res.status(200).json(retorno)
            })

        } else if (req.method == 'POST') {
            const id = v4()
            const dados = req.body
            dados.id = id

            set(ref(db, 'datainfos/' + id), dados)
            res.status(200).json(dados)

        }
    } catch (error) {
        console.error('backend',error)
    }
}
