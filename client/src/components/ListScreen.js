import React from 'react';

const EARNING_COLOR = '#1dd1a1'
const EXPENSE_COLOR = '#ff6b6b'


export default function ListScreen({ transactions,
  periods,
  filteredText,
  currentPeriod,
  onDeleteTransaction,
  onEditTransaction,
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

      <input type="text" placeholder="Filtro" value={filteredText} onChange={onFilterChange} />

      {
        transactions.map((transaction) => {
          const currentColor = transaction.type === '+' ? EARNING_COLOR : EXPENSE_COLOR

          return (
            <div key={transaction._id} style={{ ...transactionStyle, backgroundColor: currentColor }}>
              <span style={buttonsStyle}>
                <button onClick={onEditTransaction}
                  className='wave-effect waves-light btn' id={transaction._id}>Editar</button>

                <button className='wave-effect waves-light btn red darken-4' onClick={onDeleteTransaction} id={transaction._id}>X</button>
              </span>
              <span>
                {transaction.yearMonthDay} -
             <span style={{ fontWeight: "bold" }}> {transaction.category} </span> - {transaction.description} - {transaction.value}
              </span>
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