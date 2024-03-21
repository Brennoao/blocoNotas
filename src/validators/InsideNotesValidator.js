import * as Yup from 'yup'

const InsideNotesValidator = Yup.object().shape({
    nome: Yup.string().required('Campo obrigatório!'),
})

export default InsideNotesValidator