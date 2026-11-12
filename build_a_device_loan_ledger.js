const equipmentLedger = {
  "1": { 
    type: "PC", 
    status: "CheckedOut", 
    borrower: { 
      name: "John Smith", 
      email: "john@acme.org" 
    }, 
    dueDate: "11/30/2025" 
    },
  "2": { 
    type: "Laptop", 
    status: "CheckedIn", 
    borrower: { 
      name: "", 
      email: "" 
    }, 
    dueDate: "" 
    },
  "3": { 
    type: "Laptop", 
    status: "CheckedOut", 
    borrower: { 
      name: "Jane Doe", 
      email: "jane@acme.org" 
    }, 
    dueDate: "10/31/2025" 
    },
  "4": { 
    type: "iPad", 
    status: "CheckedIn", 
    borrower: { 
      name: "", 
      email: "" 
    }, 
    dueDate: "" 
    }
};

function serializeLedger(ledger) {
  return JSON.stringify(ledger)
}

function loadLedger(json) {
  return JSON.parse(json)
}

function checkoutDevice(ledger, assetTag, borrower) {
  const json = serializeLedger(ledger)
  const ledgerCopy = loadLedger(json)

  if (!ledgerCopy[assetTag]) {
    return {
      ledger: ledger,
      message: `Device ${assetTag} was not found`
    };
  }

  if (ledgerCopy[assetTag].status === "CheckedOut") {
    return {
      ledger: ledger,
      message: `Device ${assetTag} is already checked out`
    };
  }

  ledgerCopy[assetTag].status = "CheckedOut"
  ledgerCopy[assetTag].borrower.name = borrower.name
  ledgerCopy[assetTag].borrower.email = borrower.email

  return {
    ledger: ledgerCopy,
    message: `Device ${assetTag} successfully checked out to ${borrower.name}`
  };
}

function checkinDevice(ledger, assetTag) {
  const json = serializeLedger(ledger)
  const ledgerCopy = loadLedger(json)

  if (!ledgerCopy[assetTag]) {
    return {
      ledger: ledger,
      message: `Device ${assetTag} was not found`
    };
  }

  ledgerCopy[assetTag].status = "CheckedIn"
  ledgerCopy[assetTag].borrower.name = ""
  ledgerCopy[assetTag].borrower.email = ""
  ledgerCopy[assetTag].dueDate = ""

  return {
    ledger: ledgerCopy,
    message: `Device ${assetTag} successfully checked in`
  };
}

function convertDate(dateString) {
  const [month, day, year] = dateString.split("/").map(Number)
  return year * 10000 + month * 100 + day
}

function listOverdueDevices(ledger, today) {
  const result = []
  const todayValue = convertDate(today)

  for (const item of Object.values(ledger)) {
    if (item.status === "CheckedOut" && item.dueDate !== "") {
      const dateValue = convertDate(item.dueDate)

      if (dateValue < todayValue) {
        result.push(item)
      }
    }
  }

  result.sort((a, b) => {
    return convertDate(a.dueDate) - convertDate(b.dueDate)
  });

  return result;
}


// console.log(serializeLedger(equipmentLedger))
// console.log(loadLedger(serializeLedger(equipmentLedger)))
// console.log(checkoutDevice(equipmentLedger, 2, {name: "Anna", email: "anna@example.com"}))
// console.log(checkinDevice(equipmentLedger, 1))
console.log(convertDate('11/10/2026'))
console.log(listOverdueDevices(equipmentLedger, '11/10/2026'))
