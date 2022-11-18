# lesprom-front

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Сборка докер образа
```
docker build . -t lesprom-front
```

### Создание докер контейнера
```
docker run --name lesprom-front-container -d -p 8081:80 lesprom-front
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
