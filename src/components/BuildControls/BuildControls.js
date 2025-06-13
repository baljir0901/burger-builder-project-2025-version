import React from 'react';
import { useTranslation } from 'react-i18next';
import './BuildControls.css';

const BuildControls = ({ addIngredient, removeIngredient, disabled }) => {
  const { t } = useTranslation();
  
  const controls = [
    { label: t('ingredients.salad'), type: 'salad' },
    { label: t('ingredients.bacon'), type: 'bacon' },
    { label: t('ingredients.cheese'), type: 'cheese' },
    { label: t('ingredients.meat'), type: 'meat' },
  ];
  return (
    <div className="BuildControls">
      {controls.map((ctrl) => (
        <div className="BuildControl" key={ctrl.label}>
          <div className="Label">{ctrl.label}</div>          <button
            className="Less"
            onClick={() => removeIngredient(ctrl.type)}
            disabled={disabled[ctrl.type] === 0}
          >
            {t('ingredients.remove')}
          </button>
          <button
            className="More"
            onClick={() => addIngredient(ctrl.type)}
          >
            {t('ingredients.add')}
          </button>
        </div>
      ))}
    </div>
  );
};

export default BuildControls;