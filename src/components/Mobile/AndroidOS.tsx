import { useState, useRef } from 'react';
import { useSystemTime } from '../../hooks/useSystemTime';
import { apps } from '../../data/apps';
import './AndroidOS.css';

export default function AndroidOS() {
    const { androidTimeStr, currentTime } = useSystemTime();
    const [panelActive, setPanelActive] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const secondsDeg = currentTime.getSeconds() * 6;
    const minutesDeg = currentTime.getMinutes() * 6 + currentTime.getSeconds() * 0.1;
    const hoursDeg = (currentTime.getHours() % 12) * 30 + currentTime.getMinutes() * 0.5;

    const homeApps = ['Docker', 'Android Studio', 'MongoDB', 'Jenkins'].map(name => apps.find(a => a.name.toLowerCase() === name.toLowerCase()));
    const dockAppsLeft = ['SnapStore', 'MySQL'].map(name => apps.find(a => a.name.toLowerCase() === name.toLowerCase()));
    const dockAppsRight = ['Ubuntu', 'Java'].map(name => apps.find(a => a.name.toLowerCase() === name.toLowerCase()));

    const panelRef = useRef<HTMLDivElement>(null);

    const togglePanel = () => setPanelActive(!panelActive);
    const closePanel = () => setPanelActive(false);

    const handleHomeClick = () => {
        setPanelActive(false);
        setDrawerOpen(false);
    };

    // Auto-close panel when clicking outside is handled by the backdrop overlay now.

    return (
        <div id="mobile-os">
            <div className="android-status-bar" onClick={togglePanel}>
                <div className="left-time android-time-display">{androidTimeStr}</div>
                <div className="right-icons">
                    <i className="fas fa-map-marker-alt"></i>
                    <i className="fab fa-bluetooth-b"></i>
                    <i className="fas fa-bell"></i>
                    <i className="fas fa-wifi"></i>
                    <i className="fas fa-signal"></i>
                    <span style={{ marginLeft: '2px', marginRight: '4px' }}>84%</span>
                    <i className="fas fa-battery-full"></i>
                </div>
            </div>

            {/* Dimmed backdrop when panel is active */}
            <div
                className={`android-backdrop ${panelActive ? 'active' : ''}`}
                onClick={closePanel}
            ></div>

            <div className={`android-notification-panel ${panelActive ? 'active' : ''}`} ref={panelRef}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                    <span className="android-time-display" style={{ fontWeight: 'bold' }}>{androidTimeStr}</span>
                    <span>84% Battery</span>
                </div>

                <div className="android-quick-settings">
                    <div className="qs-tile active">
                        <div className="tile-icon"><i className="fas fa-wifi"></i></div>
                        <span>Wi-Fi</span>
                    </div>
                    <div className="qs-tile active">
                        <div className="tile-icon"><i className="fab fa-bluetooth-b"></i></div>
                        <span>Bluetooth</span>
                    </div>
                    <div className="qs-tile">
                        <div className="tile-icon"><i className="fas fa-moon"></i></div>
                        <span>Do Not Disturb</span>
                    </div>
                    <div className="qs-tile active">
                        <div className="tile-icon"><i className="fas fa-sync"></i></div>
                        <span>Auto-rotate</span>
                    </div>
                    <div className="qs-tile">
                        <div className="tile-icon"><i className="fas fa-plane"></i></div>
                        <span>Airplane</span>
                    </div>
                    <div className="qs-tile active">
                        <div className="tile-icon"><i className="fas fa-location-arrow"></i></div>
                        <span>Location</span>
                    </div>
                </div>

                <div className="android-notifications-list">
                    <div className="notification-card">
                        <div className="notif-header">
                            <i className="fab fa-whatsapp" style={{ color: '#25d366' }}></i>
                            <span>WhatsApp</span>
                            <span className="notif-time">Now</span>
                        </div>
                        <div className="notif-body">
                            <strong>Mr. Ittodz</strong>
                            <p>Apakah aku terlihat peduli?</p>
                        </div>
                    </div>
                </div>

                <div className="panel-handle" onClick={closePanel}></div>
            </div>

            <div className="android-screen-content">
                <div className="android-home-widgets">
                    <div className="android-analog-clock">
                        <div className="clock-face">
                            <div className="hand hour-hand" style={{ transform: `rotate(${hoursDeg}deg)` }}></div>
                            <div className="hand min-hand" style={{ transform: `rotate(${minutesDeg}deg)` }}></div>
                            <div className="hand second-hand" style={{ transform: `rotate(${secondsDeg}deg)` }}></div>
                            <div className="clock-center"></div>
                        </div>
                    </div>
                </div>

                <div className="android-home-app-row" style={{ display: 'flex', justifyContent: 'space-around', marginTop: 'auto', marginBottom: '30px', padding: '0 5px', gap: '5px' }}>
                    {homeApps.map((app, index) => (
                        app && (
                            <a key={index} href={app.url} target="_blank" rel="noreferrer" className="android-app-item" style={{ flexShrink: 0 }}>
                                <div className="app-icon" style={{ background: app.bgColor, color: app.color, flexShrink: 0 }}><i className={app.icon}></i></div>
                                <span style={{ fontSize: '11px', marginTop: '4px', textAlign: 'center', color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                                    {app.name.split(' ')[0]}
                                </span>
                            </a>
                        )
                    ))}
                </div>

                <div className="android-dock">
                    {dockAppsLeft.map((app, index) => (
                        app && (
                            <a key={`left-${index}`} href={app.url} target="_blank" rel="noreferrer" className="android-app-item dock-item">
                                <div className="app-icon" style={{ background: app.bgColor, color: app.color }}><i className={app.icon}></i></div>
                            </a>
                        )
                    ))}
                    <div className="android-app-item dock-item app-drawer-btn" onClick={() => setDrawerOpen(true)}>
                        <div className="app-icon" style={{ color: 'white' }}>
                            <i className="fas fa-th"></i>
                        </div>
                    </div>
                    {dockAppsRight.map((app, index) => (
                        app && (
                            <a key={`right-${index}`} href={app.url} target="_blank" rel="noreferrer" className="android-app-item dock-item">
                                <div className="app-icon" style={{ background: app.bgColor, color: app.color }}><i className={app.icon}></i></div>
                            </a>
                        )
                    ))}
                </div>

                {/* App Drawer Overlay */}
                <div className={`android-app-drawer ${drawerOpen ? 'open' : ''}`}>
                    <div className="drawer-handle" onClick={() => setDrawerOpen(false)}></div>
                    <div className="android-search-widget" style={{ margin: '20px', background: 'rgba(255,255,255,0.1)', color: 'white' }}>
                        <i className="fas fa-search"></i>
                        <input type="text" placeholder="Search apps..." style={{ background: 'transparent', border: 'none', color: 'white', flex: 1, outline: 'none' }} />
                    </div>
                    <div className="android-app-scroll-area">
                        <div className="android-app-grid">
                            {apps.map((app, index) => (
                                <a key={index} href={app.url} target="_blank" rel="noreferrer" className="android-app-item">
                                    <div className="app-icon" style={{ background: app.bgColor, color: app.color }}><i className={app.icon}></i></div>
                                    <span>{app.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="android-nav-bar">
                <div className="android-nav-btn" onClick={handleHomeClick}>
                    <i className="far fa-circle" style={{ fontSize: '14px', fontWeight: 'bold' }}></i>
                </div>
            </div>
        </div>
    );
}
