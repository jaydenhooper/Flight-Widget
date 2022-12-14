
const tableBody = document.getElementById('table-body')
let flights = [
    {
        time: "03:11",
        destination: "AUCKLAND",
        flight: "NZ865",
        gate: " A 13",
        remarks: "DELAYED"
    }, 
    {
        time: "08:11",
        destination: "WELLINGTON",
        flight: "NZ171",
        gate: " A 01",
        remarks: "ON TIME"
    },
    {
        time: "09:11",
        destination: "CHRISTCHURCH",
        flight: "NZ242",
        gate: " B 14",
        remarks: "DELAYED"
    },
    {
        time: "15:35",
        destination: "DUNEDIN",
        flight: "NZ155",
        gate: " B 20",
        remarks: "ON TIME"
    },
    {
        time: "16:09",
        destination: "NELSON",
        flight: "NZ147",
        gate: " C 12",
        remarks: "CANCELLED"
    }
]

const destinations = ["WELLINGTON", "CHRISTCHURCH", "AUCKLAND", "DUNEDIN", "NELSON", "PICTON"]
const remarks = ["ON TIME", "DELAYED", "CANCELLED"]
let hour = 17

function populateTable() {
    for(const flight of flights) {
        const tableRow = document.createElement("tr")

        for(const flightDetail in flight) {
            const tableCell = document.createElement("td")
            const words = Array.from(flight[flightDetail])

            for(const [index,letter] of words.entries()) {
                const letterElement = document.createElement('div')
                letterElement.classList.add('flip')
                letterElement.textContent = letter
                setTimeout(() => {
                    tableCell.append(letterElement)
                }, 100 * index) 
            }
            tableRow.append(tableCell)
        }
        tableBody.append(tableRow)
    }
   

    document.createElement("th")
}

populateTable()

function generateRandomLetter() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    return alphabet.charAt(Math.floor(Math.random() * alphabet.length))
}

function generateRandomNumber(maxNumber) {
    const numbers = "0123456789"
    if(maxNumber) {
        const newNumbers = numbers.slice(0,maxNumber)
        return newNumbers.charAt(Math.floor(Math.random() * newNumbers.length))
    }
    return numbers.charAt(Math.floor(Math.random() * numbers.length))
}

function generateTime() {
    const maxHour = 23
    const maxMin = 59
    let displayHour = hour
    if(hour < maxHour) {
        hour++
    }
    if(hour >= maxHour) {
        hour = 0
        displayHour = hour
    }
    if(hour < 10){
        displayHour = "0" + hour
    }
    return displayHour + ":" + generateRandomNumber(6) + generateRandomNumber()
}

function shuffleUp() {
    flights.shift()
    flights.push({
        time: generateTime(),
        destination: destinations[Math.floor(destinations.length * Math.random())],
        flight: generateRandomLetter() + generateRandomLetter() + " " + generateRandomNumber() + generateRandomNumber() + generateRandomNumber(),
        gate: generateRandomLetter() + generateRandomNumber() + generateRandomNumber(),
        remarks: remarks[Math.floor(remarks.length * Math.random())]
    })
    tableBody.textContent = ""
    populateTable()
}

setInterval(shuffleUp, 6000)