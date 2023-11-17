import React, { useState, useEffect } from 'react';

function CalendarWidget() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [viewDate, setViewDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const nextMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
    };

    const prevMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
    };

    const daysInMonth = (year, month) => {
        let date = new Date(year, month, 1);
        let days = [];
        while (date.getDay() !== 0) {
            date.setDate(date.getDate() - 1);
        }
        const firstDay = new Date(date);
        for (let i = 0; i < 42; i++) {
            days.push(new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + i));
        }
        return days;
    };

    const days = daysInMonth(viewDate.getFullYear(), viewDate.getMonth());

    // Formata o mês com a primeira letra maiúscula
    const monthYear = `${viewDate.toLocaleString('pt-BR', { month: 'long' }).charAt(0).toUpperCase()}${viewDate.toLocaleString('pt-BR', { month: 'long' }).slice(1)} ${viewDate.getFullYear()}`;
    const timeString = currentDate.toLocaleTimeString('pt-BR');

    return (
        <div className="p-4 max-w-xs mx-auto bg-white rounded-xl shadow-lg text-center">
            <div className="mb-4">
                <p className="text-xl text-blue-500 font-semibold">Calendário</p>
                <div className="flex justify-between items-center">
                    <button className="text-lg text-gray-800 font-semibold" onClick={prevMonth}>&lt;</button>
                    <div className="text-lg text-gray-800 font-semibold">{monthYear}</div>
                    <button className="text-lg text-gray-800 font-semibold" onClick={nextMonth}>&gt;</button>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-1">
                {['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'].map(day => (
                    <div key={day} className="text-xs font-bold text-gray-800">{day}</div>
                ))}
                {days.map((day, index) => (
                    <div
                        key={index}
                        className={`text-sm p-2 rounded-full ${
                            day.getMonth() === viewDate.getMonth() ?
                                (day.toDateString() === currentDate.toDateString() ? 'bg-blue-500 text-white' : 'text-gray-700') :
                                'text-gray-300'
                        }`}
                    >
                        {day.getDate()}
                    </div>
                ))}
            </div>
            <div className="text-md font-semibold text-gray-800">Horário Atual: {timeString}</div>
        </div>
    );
}

export default CalendarWidget;
