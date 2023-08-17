const errorMessages = {
  BAD_REQUEST: 'Переданы некорректные данные',
  UNAUTHORIZED: 'Необходима авторизация',
  UNAUTHORIZED_AUTH: 'Неправильные почта или пароль',
  FORBIDDEN: 'Невозможно удалить запись другого пользователя',
  NOT_FOUND: 'Данные не найдены',
  PAGE_NOT_FOUND: 'Страница не найдена',
  CONFLICT: 'Пользователь с таким email уже существует',
  SERVER_ERROR: 'На сервере произошла ошибка',
  EMAIL_VALIDATION_ERROR: 'Некорректный email',
  URL_VALIDATION_ERROR: 'Неправильный формат ссылки',
};

module.exports = { errorMessages };
