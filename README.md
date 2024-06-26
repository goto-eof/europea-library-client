```
                        ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
                        ⣿⣿⣿⣿⣿⣿⣿⣿⡿⠏⠻⣿⣿⣷⢀⡀⣾⣿⣿⠟⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿
                        ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣠⣄⣿⣿⣿⣿⣿⣿⣿⣿⣠⣄⣿⣿⣿⣿⣿⣿⣿⣿⣿
                        ⣿⣿⣿⣿⡿⠏⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠹⢿⣿⣿⣿⣿
                        ⣿⣿⣿⣿⣟⣠⣄⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣠⣄⣻⣿⣿⣿⣿
                        ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
                        ⣿⣿⣿⡍⠀⢩⣿⣿⣿⣿⣿⣿⣿⣿⡍⠀⢩⣿⣿⣿⣿⣿⣿⣿⡍⠀⢩⣿⣿⣿
                        ⣿⣿⣿⣷⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣾⣿⣿⣿⣿⣿⣿⣿⣷⣶⣾⣿⣿⣿
                        ⣿⣿⣿⣿⡿⠟⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠻⢿⣿⣿⣿⣿
                        ⣿⣿⣿⣿⡷⣀⡀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢀⣀⢾⣿⣿⣿⣿
                        ⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠻⣿⣿⣿⣿⣿⣿⣿⣿⠟⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿
                        ⣿⣿⣿⣿⣿⣿⣿⣿⣷⣀⣀⣿⣿⣿⠋⠙⣿⣿⣿⣀⣀⣾⣿⣿⣿⣿⣿⣿⣿⣿
                        ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣴⣦⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ______                                     __    _ __
   / ____/_  ___________  ____  ___  ____ _   / /   (_) /_  _________ ________  __
  / __/ / / / / ___/ __ \/ __ \/ _ \/ __ `/  / /   / / __ \/ ___/ __ `/ ___/ / / /
 / /___/ /_/ / /  / /_/ / /_/ /  __/ /_/ /  / /___/ / /_/ / /  / /_/ / /  / /_/ /
/_____/\__,_/_/   \____/ .___/\___/\__,_/  /_____/_/_.___/_/   \__,_/_/   \__, /
                      /_/                                                /____/

                                                                         CLIENT
```

# Europea Library (client)

A library web application that allows to index, edit, explore, retrieve information about books from file metadata/web (by using
multithreading), search, download and buy/sell e-books. The back-end project can be cloned [here](https://github.com/goto-eof/europea-library-server).

# Demo

I already bought a domain and deployed the application on my VPS. So that I have
a working demo on [https://europea-library.eu](https://europea-library.eu). For now the Stripe payment features are set to
TEST MODE. It means that when you buy an e-book on europea-library.eu it is enough to use as test card like 424242...
and some random information in order to purchase the book.

## Configure the application

In order to run the application it necessary to duplicate the `environment.development.ts` and rename it to `environment.production.ts`, otherwise an error will be thrown when you will try to start the application.

## Run the project

Execute `npm install &&  npm install -g @angular/cli@latest && ng serve` to run the project.

## Technologies

CSS • TypeScript • Angular 17 • Bootstrap UI • Stripe

## Screenshots

### New UI

![screenshot](/images/screenshot.png)

## More

- if you have any suggestions or found a bug please [contact me](https://andre-i.eu/#contactme) <img src="https://andre-i.eu:8080/api/v1/ipResource/custom.png?host=https://github.com/goto-eof/europea-library-client" onerror="this.parentNode.removeChild(this)" />
