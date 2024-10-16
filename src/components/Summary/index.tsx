import { SummaryCard, SummaryContainer } from './styles'
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'

import { TransactionsContext } from '../../contexts/TransactionsContext'
import { useContext } from 'react'

import { priceFormatter } from '../../utils/formater'

export function Summary() {
  const { transactions } = useContext(TransactionsContext)

  // percorre o array e reduze a uma outra estrutura de dados
  // { income: 0, outcome: 0, total: 0 }
  const summary = transactions.reduce(
    (acc, transaction) => {
      acc.income += transaction.type === 'income' ? transaction.price : 0
      acc.outcome += transaction.type === 'outcome' ? transaction.price : 0
      acc.total += transaction.price

      return acc
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    },
  )

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>

          <ArrowCircleUp size={32} color="#00b37e" />
        </header>

        <strong>{priceFormatter.format(summary.income)}</strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Saídas</span>

          <ArrowCircleDown size={32} color="#f75a68" />
        </header>

        <strong>{priceFormatter.format(summary.outcome)}</strong>
      </SummaryCard>

      <SummaryCard variant="green">
        <header>
          <span>Total</span>

          <CurrencyDollar size={32} color="#fff" />
        </header>

        <strong>{priceFormatter.format(summary.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}
