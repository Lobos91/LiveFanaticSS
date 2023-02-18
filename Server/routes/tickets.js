module.exports = function (server, db) {
  // function to insert object to db
  function insertTickets(ticket) {
    const stmt = db.prepare(
      "UPDATE tickets SET userid=?,  booked=? WHERE ticketid=?"
    );
    stmt.run(ticket.userid, ticket.booked, ticket.ticketid);
    console.log(stmt);
  }

  server.put("/data/tickets", (request, response) => {
    const tickets = request.body;
    console.log(request.body);

    try {
      tickets.forEach((ticket) => {
        insertTickets(ticket);
      });
      response.send("tickets inserted to database");
    } catch (e) {
      console.error(e);
    }
  });
};
