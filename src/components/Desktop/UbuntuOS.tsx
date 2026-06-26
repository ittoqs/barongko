import { useState, useEffect, useRef } from 'react';
import { useSystemTime } from '../../hooks/useSystemTime';
import { apps } from '../../data/apps';
import './UbuntuOS.css';

export default function UbuntuOS() {
    const { ubuntuTimeStr, currentTime } = useSystemTime();
    const [overlayActive, setOverlayActive] = useState(false);
    const [dropdownActive, setDropdownActive] = useState(false);
    const [calendarActive, setCalendarActive] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const statusTriggerRef = useRef<HTMLDivElement>(null);
    const clockRef = useRef<HTMLDivElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);

    const toggleOverlay = () => {
        setOverlayActive(!overlayActive);
        if (dropdownActive) setDropdownActive(false);
        if (calendarActive) setCalendarActive(false);
    };

    const toggleDropdown = (e: React.MouseEvent) => {
        e.stopPropagation();
        setDropdownActive(!dropdownActive);
        if (overlayActive) setOverlayActive(false);
        if (calendarActive) setCalendarActive(false);
    };

    const toggleCalendar = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCalendarActive(!calendarActive);
        if (overlayActive) setOverlayActive(false);
        if (dropdownActive) setDropdownActive(false);
    };



    const handleOverlayAppClick = () => {
        setOverlayActive(false);
    };

    useEffect(() => {
        const handleWindowClick = (e: MouseEvent) => {
            const target = e.target as Node;
            if (
                dropdownActive &&
                dropdownRef.current &&
                !dropdownRef.current.contains(target) &&
                statusTriggerRef.current &&
                !statusTriggerRef.current.contains(target)
            ) {
                setDropdownActive(false);
            }

            if (
                calendarActive &&
                calendarRef.current &&
                !calendarRef.current.contains(target) &&
                clockRef.current &&
                !clockRef.current.contains(target)
            ) {
                setCalendarActive(false);
            }
        };

        window.addEventListener('click', handleWindowClick);
        return () => window.removeEventListener('click', handleWindowClick);
    }, [dropdownActive, calendarActive]);

    const year = currentTime.getFullYear();
    const month = currentTime.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday
    const firstDayOffset = firstDay === 0 ? 6 : firstDay - 1; // Start on Monday
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthName = monthNames[month];

    const ubuntuDockAppNames = ['GitHub', 'GitLab', 'Flathub', 'Docker', 'Linux', 'React', 'Jan', 'Rust'];
    const ubuntuDockApps = ubuntuDockAppNames.map(name => apps.find(a => a.name.toLowerCase() === name.toLowerCase())).filter(Boolean);

    return (
        <div id="ubuntu-os">
            <div className="ubuntu-top-bar">
                <div className="left">
                    <div className={`activities-btn ${overlayActive ? 'active' : ''}`} onClick={toggleOverlay}>
                        Activities
                    </div>
                </div>
                <div className={`center-clock ubuntu-time-display ${calendarActive ? 'active' : ''}`} ref={clockRef} onClick={toggleCalendar} style={{ cursor: 'pointer', padding: '0 10px', borderRadius: '4px', background: calendarActive ? 'rgba(255,255,255,0.1)' : 'transparent' }}>
                    {ubuntuTimeStr}
                </div>
                <div className="right">
                    <div className={`system-status ${dropdownActive ? 'active' : ''}`} ref={statusTriggerRef} onClick={toggleDropdown}>
                        <i className="fas fa-network-wired"></i>
                        <i className="fas fa-volume-up"></i>
                        <i className="fas fa-battery-three-quarters"></i>
                        <i className="fas fa-caret-down" style={{ marginLeft: '4px' }}></i>
                    </div>
                </div>
            </div>

            {/* Dimmer backdrop for dropdown to ensure clickaway and focus (optional, but handling via window click is fine) */}

            <div className={`ubuntu-dropdown ${dropdownActive ? 'active' : ''}`} ref={dropdownRef}>
                <div className="ubuntu-dropdown-section">
                    <div className="ubuntu-slider-container">
                        <i className="fas fa-volume-up" style={{ width: '20px', textAlign: 'center' }}></i>
                        <input type="range" min="0" max="100" defaultValue="75" />
                    </div>
                    <div className="ubuntu-slider-container">
                        <i className="fas fa-sun" style={{ width: '20px', textAlign: 'center' }}></i>
                        <input type="range" min="0" max="100" defaultValue="80" />
                    </div>
                </div>
                
                <hr className="ubuntu-divider" />
                
                <div className="ubuntu-dropdown-item">
                    <div className="item-icon-circle active"><i className="fas fa-network-wired"></i></div>
                    <div className="item-text">
                        <span>Wired Connected</span>
                    </div>
                    <i className="fas fa-chevron-right chevron"></i>
                </div>
                <div className="ubuntu-dropdown-item">
                    <div className="item-icon-circle"><i className="fas fa-bluetooth"></i></div>
                    <div className="item-text">
                        <span>Bluetooth Off</span>
                    </div>
                    <i className="fas fa-chevron-right chevron"></i>
                </div>
                <div className="ubuntu-dropdown-item">
                    <div className="item-icon-circle active" style={{ background: 'transparent' }}>
                        <i className="fas fa-battery-three-quarters" style={{ color: '#fff', fontSize: '16px' }}></i>
                    </div>
                    <div className="item-text">
                        <span>84% - 2:15 Until Full</span>
                    </div>
                </div>
                
                <hr className="ubuntu-divider" />
                
                <div className="ubuntu-dropdown-footer">
                    <div className="footer-btn"><i className="fas fa-camera"></i></div>
                    <div className="footer-btn"><i className="fas fa-cog"></i></div>
                    <div className="footer-btn"><i className="fas fa-lock"></i></div>
                    <div className="footer-btn"><i className="fas fa-power-off"></i></div>
                </div>
            </div>

            {/* Calendar Dropdown */}
            {calendarActive && (
                <div className="ubuntu-calendar-dropdown" ref={calendarRef}>
                    <div className="calendar-header">
                        {monthName} {year}
                    </div>
                    <div className="calendar-grid">
                        <div className="day-name">Mo</div>
                        <div className="day-name">Tu</div>
                        <div className="day-name">We</div>
                        <div className="day-name">Th</div>
                        <div className="day-name">Fr</div>
                        <div className="day-name">Sa</div>
                        <div className="day-name">Su</div>
                        {Array.from({ length: firstDayOffset }).map((_, i) => (
                            <div key={`empty-${i}`} className="calendar-day empty"></div>
                        ))}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const isToday = day === currentTime.getDate();
                            return (
                                <div key={day} className={`calendar-day ${isToday ? 'today' : ''}`}>
                                    {day}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <div className="ubuntu-dock">
                {ubuntuDockApps.map((app, index) => (
                    app && (
                        <a key={index} href={app.url} target="_blank" rel="noreferrer" className="dock-item" style={{ background: app.bgColor, color: app.color }} data-name={app.name}>
                            <i className={app.icon}></i>
                        </a>
                    )
                ))}

                <div className="dock-item show-apps" onClick={toggleOverlay} data-name="Show Applications">
                    <i className="fas fa-th"></i>
                </div>
            </div>

            <div 
                className={`gnome-overlay ${overlayActive ? 'active' : ''}`} 
                onClick={(e) => {
                    // Close if clicking exactly on the background, not on children
                    if (e.target === e.currentTarget) {
                        setOverlayActive(false);
                    } else if ((e.target as Element).closest('a')) {
                        handleOverlayAppClick();
                    }
                }}
            >
                <div className="gnome-search-bar">
                    <i className="fas fa-search"></i>
                    <input type="text" placeholder="Type to search" onClick={(e) => e.stopPropagation()} />
                </div>
                
                <div className="gnome-app-scroll-area">
                    <div className="gnome-app-grid">
                        {apps.map((app, index) => (
                            <a key={index} href={app.url} target="_blank" rel="noreferrer" className="overlay-app">
                                <div className="icon-wrapper" style={{ background: app.bgColor, color: app.color }}><i className={app.icon}></i></div>
                                <span>{app.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
