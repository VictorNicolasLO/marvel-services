# Marvel services

## Architecture

### Architecture Summary

Please click for HD resolution
![Architecture summary](https://user-images.githubusercontent.com/21212247/91680422-68e00900-eb08-11ea-9167-c1cb3d83482e.png)

### Infrastructure

<img src="https://www.gstatic.com/devrel-devsite/prod/v425077d6c7be97246d05a953898cb9591a173a3cef753a451b8729896196bc0a/cloud/images/cloud-logo.svg" width="300" />

**Google Services used** - Kubernetes Engine (GKE) - Cloud build - Compute Engine - Container registry

**Other services** - Github actions

**Containers**

- Docker

**Communication**

- Kafka
- Typical Https

**Databases**

- MongoDB (In Mongo Atlas) <img src="https://infinapps.com/wp-content/uploads/2018/10/mongodb-logo.png" width="30" />
- SSDB (Key Value Persistent Database)

### Microservices patterns

- Event driven architecture
- CQRS
- Domain driven design
- Event sourcing

### CI/CD and deployment

- **Trigger**: Github actions
- **Image builder**: GCP Cloud build
- **Deployment**: Kubernetes

## Packages

#### Infrastructure

The _Core_
Contains all code related to Infrastructure layer such databases connection, management, communication buses and modeling objects. It exports an easy library based on Repositories, Models and buses.

#### Marvel comics cron

Its the service in charge of communicate with marvel comics api and then push the command `CreateComicCommand` to create comics

#### Comics (Domain service)

Domain Service that listens `CreateComicCommand` , validates the data and then emit the event `ComicCreatedEvent`

#### Character interactions (Domain service)

This service Listen the event `ComicCreatedEvent` to detect character interactions, then it push a command `CreateCharacterInteracctionCommand` and finally when the `characterInteraction` is created, emits the event `characterInteractionCreatedEvent`

#### Character creators (Domain service)

Like the **Character interactions** service, it listen the event `ComicCreatedEvent` to detect character and creators relationships, but now this push a command `CreateCharacterCreatorCommand` and finally, emmits the event `CharacterCreatorCreatedEvent`

#### Search character interactions (Query service)

In charge of save the data as readable as possible, it listen the `CharacterInteractionCreatedEvent` and then it saves the data into SSDB which is a key value database to perform the query very quickly.

#### Search character creators (Query service)

In charge of save the data as readable as possible, it listen the `CharacterCreatorCreatedEvent` and then it saves the data into DB (Key value database) to perform the query very quickly.

#### Gateway web

Service that interact with the client and perform a query or command to the correspondent Service (in this case just for Search services)
