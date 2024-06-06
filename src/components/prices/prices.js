import React, { useState } from 'react';
import './prices.css';
import GroupIcon from '@mui/icons-material/Group';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import PersonIcon from '@mui/icons-material/Person';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import SafetyDividerIcon from '@mui/icons-material/SafetyDivider';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

const Prices = () => {
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
    const formData = { name, phone, data, quantity, zone };

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
    <div className='prices-content'>
      <img src='/mainlogo.webp' alt='Logo' className='mainImage' />
      <div className='textmain1'>
        <div className='roundedContainerPrice'>
          <h1 className='textPrice'>VR Arena</h1>
          <img src='/Arena.jpg' alt='Logo' className='ArenaImage' />
          <div className='info1'>
            <p><GroupIcon className='icon' />От 2 до 8 человек</p>
            <p><LocationOnIcon className='icon' />Площадь 150 кв.м.</p>
            <p><TransferWithinAStationIcon className='icon' />Игры со свободным перемещением</p>
            <p><PersonIcon className='icon' />Одиночные игры</p>
            <h1>Цена:<br />250 лей/человек</h1>
          </div>
        </div>
      </div>

      <div className='textmain2'>
        <div className='roundedContainerPrice'>
          <h1 className='textPrice'>PS5</h1>
          <img src='/PS5.PNG' alt='Logo' className='PSImage' />
          <div className='info2'>
            <p><GroupIcon className='icon' />От 1 до 4 человек</p>
            <p><SportsEsportsIcon className='icon' />Более 15 игр</p>
            <p><VideogameAssetIcon className='icon' />Игры от EA Sports</p>
            <p><SafetyDividerIcon className='icon' />Игры на двоих</p>
            <h1>Цена:<br />60 лей/час</h1>
          </div>
        </div>
      </div>

      <button className='reserveButPrice' onClick={openModal}>ЗАБРОНИРОВАТЬ</button>

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
    </div>
  );
};

export default Prices;
