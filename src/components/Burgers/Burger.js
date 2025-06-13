import React from 'react';
import { useTranslation } from 'react-i18next';
import './Burger.css';

const Burger = ({ ingredients }) => {
  const { t } = useTranslation();
  
  // ingredients байгаа эсэхийг шалгах
  if (!ingredients) {
    return <p>{t('ingredients.pleaseAdd')}</p>;
  }

  let transformedIngredients = Object.keys(ingredients).flatMap((type) =>
    Array.from({ length: ingredients[type] }, (_, i) => (
      <div key={`${type}-${i}`} className={type}></div>
    ))
  );

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>{t('ingredients.pleaseAdd')}</p>;
  }
  return (
    <div className="Burger">
      <div className="BreadTop">
        <div className="Seeds1"></div>
        <div className="Seeds2"></div>
      </div>
      {transformedIngredients}
      <div className="BreadBottom"></div>
    </div>
  );
};

export default Burger;