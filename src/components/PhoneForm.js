import React from 'react';

export default class PhoneForm extends React.Component {

  onSubmit = e => {
    e.preventDefault();
    let shouldSend = window.confirm('Вы уверены, что хотите отправить сообщение?');
    if (!shouldSend) return;
    this.props.onSuccess();
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="tel"
          placeholder="Номер телефона"
        />
        <button>Далее</button>
      </form>
    )
  }
}
