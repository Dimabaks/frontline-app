import React, { useState } from 'react';
import './main.css';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [data, setData] = useState('');
  const [quantity, setQuantity] = useState('');
  const [zone, setZone] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleClickOutside = (event) => {
    if (event.target.id === 'modal') {
      setIsModalOpen(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = { name, phone, data, quantity, zone};

    try {
      const response = await fetch('http://localhost:3000/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Форма успешно отправлена');
        // Дополнительная логика после успешной отправки
      } else {
        console.error('Ошибка при отправке формы');
        // Обработка ошибок
      }
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
      // Обработка ошибок
    }

    // Закрыть модальное окно после отправки
    setIsModalOpen(false);
  };

  return (
    <div className='mainContent'>
      <img src='/mainlogo.webp' alt='Logo' className='mainImage' />
      <div className='textmain'>
        <div className='roundedContainer'>
          <h1 className='text'>Клуб виртуальной <br />реальности Frontline <br />VR в Кишиневе</h1>
          <div className='iconTextContainer'>
            <SupervisorAccountIcon className='perIcon' style={{ fontSize: '3rem' }} />
            <span className='perText'>От 2 до 12 человек</span>
            <EscalatorWarningIcon className='perIcon' style={{ fontSize: '3rem' }} />
            <span className='perText'>Для детей и взрослых</span>
            <AccessAlarmIcon className='perIcon' style={{ fontSize: '3rem' }} />
            <span className='perText'>Время игры от 40 минут</span>
          </div>
          <button className='reserveBut' onClick={openModal}>ЗАБРОНИРОВАТЬ</button>
          {isModalOpen && (
        <div className='modal' id='modal' onClick={handleClickOutside}>
          <div className='modal-container'>
            <div className='modal-body'>
              <p>Забронировать</p>
              <form onSubmit={handleSubmit}>
                <input
                  type='text'
                  placeholder='Имя'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type='text'
                  placeholder='Номер телефона'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <input
                  type='datetime-local'
                  placeholder='Дата и время брони'
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  required
                />
                <input
                  type='text'
                  placeholder='Количество человек'
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
                <select
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  required
                >
                  <option value='' disabled>Выберите зону</option>
                  <option value='VR Arena'>VR Arena</option>
                  <option value='PS5'>PS5</option>
                </select>
                <button type='submit'>Забронировать</button>
              </form>
              <div className='modal-close' onClick={closeModal}>&times;</div>
            </div>
          </div>
        </div>
      )}
          <div className='location'>
            <h2 className='locationText'>г.Кишинев,Албишоара 4,Торговый Центр "Атриум"(4этаж)</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
