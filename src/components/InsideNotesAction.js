const FabActions = ({ showModal }) => [
    // { icon: 'plus', onPress: () => console.log('Pressed add') },
    {
        icon: 'eye',
        label: 'Notas Salves',
        onPress: () => {},
    },
    {
        icon: 'plus',
        label: 'Nova Nota',
        onPress: showModal,
    },
]

export { FabActions }