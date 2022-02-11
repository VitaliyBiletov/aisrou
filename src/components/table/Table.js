import React, {useState} from 'react'
import './style.sass'

const HEADERS = ['id', 'Имя', 'Фамилия', 'Отчество', 'Email', 'Роль']

const USERS = [
  {id: 0, firstName: 'Vitaliy', lastName:'Biletov', patronymic: 'Alexandrovich', email: 'vit.biletov@gmail.com', role: 'ADMIN'},
  {id: 1, firstName: 'Ivan', lastName:'Petrov', patronymic: 'Sergeevich', email: 'ivanpetrov@mail.ru', role: 'USER'},
]


function Table() {
  const [active, setActive] = useState(0)

  return(
    <div className='table'>
      <div className='table__container'>
        <table className='table__table'>
          <thead className='table__thead thead'>
            <tr className='thead__tr'>
              {HEADERS.map(key=>
                <th className='thead__th'>{key}</th>
              )}
            </tr>
          </thead>
          <tbody className='table__tbody tbody'>
          {USERS.map((user, index)=>
            <tr
              key={user.id}
              data-value={user.id}
              onClick={()=>setActive(user.id)}
              className={`${active === user.id ? 'tbody__tr_active' : null} tbody__tr`}
            >
              {Object.entries(user).map(([key,value])=>
                <td className='tbody__td'>{value}</td>
              )}
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table