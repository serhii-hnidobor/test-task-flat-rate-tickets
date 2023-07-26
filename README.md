# Concert Ticket Service - Readme

This simple service that fetches concert tickets from a my.laphil.com and returns them to users through an HTTP call or GraphQL query, using Puppeteer typescript and nestJS.

## Getting Started

To get started with the project, follow the instructions below:

### Prerequisites

Before running the service, make sure you have the following installed on your system:

1. Node.js (v18 or above)
2. pnpm

### Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the required dependencies.

```bash
$ pnpm install
```

### Building the Project local

To build the project local and compile Typescript code, run the following command:

```bash
$ pnpm run build
```

### Running the Service local

To start the service, use the following command:

```bash
$ npm start
```

### Running the Service docker

To start the service, use the following command:

```bash
$ pnpm run docker:start
```

The service should now be up and running and listening on port 3000 for incoming HTTP requests.

## API Documentation

### Endpoint

The service exposes a single HTTP endpoint to fetch available concert tickets for a specific event.

```
GET http://localhost:3000/tickets/:eventId
```

### Request Parameters

- `eventId`: The ID of the event for which you want to fetch available tickets.

### Response

The response will contain a list of concert tickets available for the specified event, with each ticket having the following fields:

- `section`: The section of the venue where the seat is located.
- `row`: The row in the section where the seat is located.
- `seat`: The seat number within the row.
- `price`: The price of the ticket.

Example Response:

```json
[
  {
    "Section": "A",
    "Row": "1",
    "Seat Number": "25",
    "Price": "500$"
  },
  {
    "Section": "B",
    "Row": "3",
    "Seat Number": "10",
    "Price": "650$"
  }
]
```

### GraphQL Support

The service should also support querying available concert tickets using GraphQL. Here's an example query:

```graphql
query {
  tickets(eventId: 1196) {
    section
    row
    seat
    price
  }
}
```

### End-to-End Testing

To demonstrate that the service works as expected, write end-to-end tests that cover different scenarios and verify that the app functions correctly.

Run test by this command
```bash
$ pnpm run test:e2e
```
