# PLAN: Pet Care (Redux)

Ориентир — уже существующая фича `src/features/account` (accountActions.ts,
accountReducer.ts) и подключение в `src/app/store.ts` / `src/app/hooks.ts`.
Новую фичу `pet` делаем строго по такому же паттерну, но пишете код сами —
я только держу план и отвечаю на вопросы по ходу.

## 0. Проверка окружения

- [x] Убедиться, что `redux` и `react-redux` уже есть в `package.json` (они уже есть — ставить не нужно)
- [х] Посмотреть `src/app/store.ts` и `src/app/hooks.ts` — это уже готовая инфраструктура, её трогать не нужно, только дополнить `store.ts` новым редьюсером на шаге 4

## 1. Спроектировать состояние и типы

- [x] Создать папку `src/features/pet/`
- [x] Определить тип `PetState`: `{ name: string; hunger: number; happiness: number; energy: number }`
- [x] Определить `initialState` со значениями из задания (`Barsik`, 50/50/50)
- [x] Подумать: где будет жить общая логика "не выходить за границы 0..100" — пригодится и для hunger, и для happiness, и для energy (по аналогии с проверкой `res < 0` в `accountReducer.ts`, но здесь границ две — нижняя и верхняя)

## 2. Actions и action creators (`src/features/pet/petActions.ts`)

- [x] Завести константы типов действий (по аналогии с `DEPOSIT`, `WITHDRAW`, `RESET`): например `FEED`, `PLAY`, `SLEEP`, `RESET`
- [x] Описать TS-типы для каждого action (`FeedAction`, `PlayAction`, `SleepAction`, `ResetAction`)
- [x] Собрать их в один union-тип `PetAction` (как `AccountAction`)
- [x] Написать action creator-функции: `feedAction()`, `playAction()`, `sleepAction()`, `resetAction()`
- [x] Решить: нужен ли payload у этих действий, или они просто меняют состояние на фиксированный шаг (например -10/+10)? Если шаг фиксированный — payload не обязателен

## 3. Reducer (`src/features/pet/petReducer.ts`)

- [x] Импортировать типы и константы из `petActions.ts`
- [x] Написать `petReducer(state = initialState, action: PetAction)`
- [x] В `switch` обработать `FEED`, `PLAY`, `SLEEP`, `RESET`, `default`
- [x] Feed → уменьшает `hunger`
- [x] Play → увеличивает `happiness`, уменьшает `energy`
- [x] Sleep → увеличивает `energy`
- [x] Reset → возвращает `initialState`
- [x] На каждое изменение поля применить ограничение диапазона 0..100 (не забыть — если в Play меняются два поля, оба должны быть ограничены независимо)

## 4. Подключить в store

- [x] В `src/app/store.ts` добавить `pet: petReducer` в `combineReducers`
- [x] Проверить, что `RootState` подтянул новый срез стейта автоматически (он выводится через `ReturnType<typeof store.getState>`, руками менять не нужно)

## 5. Компоненты

По аналогии с `Balance.tsx` (только чтение) и `Operation.tsx` (только запись):

- [ ] `src/components/PetStatus.tsx` — читает `name`, `hunger`, `happiness`, `energy` через `useAppSelector` и выводит их на экран
- [ ] `src/components/PetControls.tsx` — 4 кнопки (Feed, Play, Sleep, Reset), каждая по клику вызывает `useAppDispatch()` и диспатчит соответствующий action creator
- [ ] Подключить оба компонента в `App.tsx`

## 6. Ручное тестирование

- [ ] `npm run dev`, открыть приложение
- [ ] Проверить, что каждая кнопка меняет нужные поля и в нужную сторону
- [ ] Проверить границы: довести hunger/energy до 0 и убедиться что дальше не уходит в минус; довести happiness до 100 и проверить что не растёт выше
- [ ] Проверить Reset — возвращает ровно к `{ name: "Barsik", hunger: 50, happiness: 50, energy: 50 }`

## 7. (по желанию) Полировка

- [ ] Немного стилей для наглядности (можно переиспользовать `App.css`)
- [ ] Проверить `npm run lint`

---

Отмечайте пункты по мере выполнения и спрашивайте, если что-то непонятно на конкретном шаге.
