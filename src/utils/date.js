const d = new Date();
const getFullYear = d.getFullYear();
const getMonth = ("0" + (d.getMonth() + 1)).slice(-2);
const getDay = ("0" + d.getDate()).slice(-2);


export const localDate = `${getFullYear}-${getMonth}-${getDay}`;
export const formatDate = date => {
	const dateParts = date.split("-");
	const jsDate = new Date(...dateParts);

	return `${jsDate.getDate()} / ${jsDate.getMonth()} / ${jsDate.getFullYear()}`;
};
export const formatDateDayOnly = date => {
	const dateParts = date.split("-");
	const jsDate = new Date(...dateParts);

	return `${jsDate.getDate()}`;
};
export const formatDateMonthOnly = date => {
	const dateParts = date.split("-");
	const jsDate = new Date(...dateParts);

	return `${jsDate.getMonth()}`;
};
export const isOutOfRangeDate = (date, type = "past") => {
	if (type === "future") {
		return date > localDate;
	}
	return date < localDate;
};
