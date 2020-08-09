import React from 'react';

const EARNING_COLOR = '#1dd1a1'
const EXPENSE_COLOR = '#ff6b6b'


export default function ListScreen({ transactions,
  periods,
  filteredText,
  currentPeriod,
  onDeleteTransaction,
  onEditTransaction,
  onNewTransaction,
  onFilterChange,
  onPeriodChange,
}) {

  const { transactionStyle, buttonsStyle } = styles

  return (
    <>
      <select className="browser-default" value={currentPeriod} onChange={onPeriodChange}>

        {periods.map((period) => {
          return <option key={period}>{period}</option>
        })}
      </select>

      <input type="text" placeholder="Filtro" value={filteredText} onChange={onFilterChange} style ={{marginTop: '20px'}}/>

      <div style ={{marginTop: '20px', marginBottom: '20px'}} >
        <button className='waves-effect waves-light btn' onClick={onNewTransaction}>Novo lançamento</button>
      </div>

      {
        transactions.map((transaction) => {
          const currentColor = transaction.type === '+' ? EARNING_COLOR : EXPENSE_COLOR

          return (
            <div key={transaction._id} style={{ ...transactionStyle, backgroundColor: currentColor }}>
              
              <span style={buttonsStyle}>
                <button onClick={onEditTransaction}
                  className='wave-effect waves-light btn' id={transaction._id}>Editar</button>

                <button className='wave-effect waves-light btn red darken-4' onClick={onDeleteTransaction} id={transaction._id} style={{ marginLeft: '10px' }}>X</button>
              </span>

              {transaction.yearMonthDay} -{' '}
              <strong>{transaction.category}</strong> -{' '}
              {transaction.description} - {transaction.value}

            </div>
          )
        })}
    </>
  );
}

const styles = {
  transactionStyle: {
    padding: '5px',
    margin: '5px',
    border: '1px solid lightgray',
    borderRadius: '5px'
  },
  buttonsStyle: {
    margin: '10px',
  }
}