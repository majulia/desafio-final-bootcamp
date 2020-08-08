import React, { useEffect } from 'react';
import axios from 'axios';
import ListScreen from './components/ListScreen';
import MaintenanceScreen from './components/MaintenanceScreen';

const api = axios.create({ baseURL: 'api' })
const RESOURCE = '/transaction'

const PERIODS = [
  '2019-01',
  '2019-02',
  '2019-03',
  '2019-04',
  '2019-05',
  '2019-06',
  '2019-07',
  '2019-08',
  '2019-09',
  '2019-10',
  '2019-11',
  '2019-12',
  '2020-01',
  '2020-02',
  '2020-03',
  '2020-04',
  '2020-05',
  '2020-06',
  '2020-07',
  '2020-08',
  '2020-09',
  '2020-10',
  '2020-11',
  '2020-12',
  '2021-01',
  '2021-02',
  '2021-03',
  '2021-04',
  '2021-05',
  '2021-06',
  '2021-07',
  '2021-08',
  '2021-09',
  '2021-10',
  '2021-11',
  '2021-12',
]
const LIST_SCREEN = 0
const MAINTENANCE_SCREEN = 1

export default function App() {
  const [transactions, setTransactions] = React.useState([])
  const [filteredTransactions, setFilteredTransactions] = React.useState([])
  const [currentPeriod, setCurrentPeriod] = React.useState(PERIODS[0])
  const [currentScreen, setCurrentScreen] = React.useState(LIST_SCREEN)
  const [filteredText, setFilteredText] = React.useState('')
  const [selectedTransaction, setSelectedTransaction] = React.useState(null)

  React.useEffect(() => {
    const fetchTransactions = async () => {
      const { data } = await api.get(`/transaction?period=${currentPeriod}`)

      setTransactions(data.transactions)
    }
    fetchTransactions()
  }, [currentPeriod])

  //exibindo lista depois de item removido
  React.useEffect(() => {
    let newfilteredTransactions = [...transactions]

    if (filteredText.trim() !== '') {
      newfilteredTransactions = newfilteredTransactions.filter((transaction) => {
        return transaction.description.toLowerCase().includes(filteredText)
      }
      )
    }

    setFilteredTransactions(newfilteredTransactions)
  }, [transactions, filteredText])

  React.useEffect(() => {
    const newScreen = selectedTransaction !== null ? MAINTENANCE_SCREEN : LIST_SCREEN

    setCurrentScreen(newScreen)
  }, [selectedTransaction])

  //Mudando as datas do select
  const handlePeriodChange = (e) => {
    const newPeriod = e.target.value;
    setCurrentPeriod(newPeriod)
  }

  //função onclick deletando dados
  const handleDeleteTransaction = async (e) => {
    const id = e.target.id

    await api.delete(`${RESOURCE}/${id}`)

    const newTransactions = transactions.filter(transaction => {
      return transaction._id !== id
    })

    setTransactions(newTransactions)
  }

  // Editar campos
  const handleEditTransaction = async (e) => {
    const id = e.target.id

    const newSelectedTransaction = filteredTransactions.find((transaction) => {
      return transaction._id === id 
    })

    console.log(newSelectedTransaction)

    setSelectedTransaction(newSelectedTransaction)
  }

  //Filtrando input
  const handleFilterChange = (e) => {
    const text = e.target.value.trim()
    setFilteredText(text.toLowerCase())
  }

  return (
    <div className='container'>
      <h1 className='center'>Desafio Final do Bootcamp Full Stack</h1>
      {
        currentScreen === LIST_SCREEN ? (
          <ListScreen transactions={filteredTransactions}
            periods={PERIODS}
            currentPeriod={currentPeriod}
            filteredText={filteredText}
            onDeleteTransaction={handleDeleteTransaction}
            onEditTransaction={handleEditTransaction}
            onFilterChange={handleFilterChange}
            onPeriodChange={handlePeriodChange}
          />
        ) : (
          <MaintenanceScreen />
          )
      }
    </div>
  )
}