import React from "react";
import { useNavigate } from "react-router-dom";

const EventCard = (event) => {

    const navigate = useNavigate();

    const formatDateRange = (startDateString, endDateString) => {
        const startDate = new Date(startDateString);

        const startDay = startDate.getDate();
        const startMonth = startDate.toLocaleString('default', { month: 'short' });
        const startYear = startDate.getFullYear();

        const startSuffix = (startDay > 3 && startDay < 21) || startDay % 10 > 3 ? 'th' : ['st', 'nd', 'rd'][startDay % 10 - 1] || 'th';

        if (!endDateString) {
            return `${startDay}${startSuffix} ${startMonth} ${startYear}`;
        }

        const endDate = new Date(endDateString);

        const endDay = endDate.getDate();
        const endMonth = endDate.toLocaleString('default', { month: 'short' });
        const endYear = endDate.getFullYear();

        const endSuffix = (endDay > 3 && endDay < 21) || endDay % 10 > 3 ? 'th' : ['st', 'nd', 'rd'][endDay % 10 - 1] || 'th';

        if (startYear === endYear) {
            if (startMonth === endMonth) {
                return `${startDay}${startSuffix} - ${endDay}${endSuffix} ${startMonth} ${startYear}`;
            }
            return `${startDay}${startSuffix} ${startMonth} - ${endDay}${endSuffix} ${endMonth} ${startYear}`;
        }

        return `${startDay}${startSuffix} ${startMonth} ${startYear} - ${endDay}${endSuffix} ${endMonth} ${endYear}`;
    };

    const handleDetails = (eventId) => {
        navigate(`${event.path}/${eventId}`);
    }

    return (
        <div className="event-card relative cursor-pointer" onClick={() => handleDetails(event?.eventId)} >
            <img src={event?.eventImage} alt={event?.eventName} height="100%" width="100%" className="absolute event-card-image z-0" />
            <div className="z-1 bg-none relative w-100 h-100 event-content d-flex flex-column justify-content-between">
                <div className="p-4">
                    <div className="event-date p-1 ps-2 pe-2 d-flex align-items-center gap-1"><div className={`${event?.type === "past" && "dot-date"} ${event?.type === "coming" &&"dot-date-uc"} ${event?.type === "live" &&"dot-date-live"} `} />{formatDateRange(event?.eventStartDate, event?.eventEndDate)}</div>
                </div>
                <div className="event-discription p-4" >
                    <h1>{event?.eventName}</h1>
                    <p>{event?.eventShortDes}</p>
                    <p>{event?.eventLocation}</p>
                </div>
            </div>
        </div>
    );
}

export default EventCard;