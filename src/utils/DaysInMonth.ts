export const getDaysInMonth = (year: number, month: number) => {
    const firstDayOfMonth = new Date(year, month, 0).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const daysArray = []

    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(null)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      daysArray.push(day)
    }

    const remainingDays = daysArray.length % 7;
    if (remainingDays > 0) {
      for (let i = 0; i < 7 - remainingDays; i++) {
        daysArray.push(null);
      }
    }

    return daysArray
  }