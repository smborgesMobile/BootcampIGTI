const formatter = Intl.NumberFormat("pt-BR");

function formatNumberToCurrency(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export { formatNumberToCurrency };
