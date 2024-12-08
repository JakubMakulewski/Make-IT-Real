import React, {useState} from 'react';

const ProjectDetails = () => {
    const [project] = useState({
        title: 'Tytuł Projektu',
        description: 'Opis projektu. Krótki opis celu i zakresu projektu.',
        status: 'in progress',
        isPrivate: false,
        participants: 10,
        maxParticipants: 20 // Dodano maksymalną liczbę uczestników
    });

    return (
        <div style={{
            margin: '0 2rem'
        }}>
            <div style={{
                maxWidth: '1300px',
                margin: '5rem auto',
                boxShadow: '0 6px 20px rgba(56, 125, 255, 0.55)',
                filter: 'drop-shadow(0 6px 20px rgba(56, 125, 255, 0.55))',
                borderRadius: '10px',
                padding: '20px 30px 30px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <h2>{project.title}</h2>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '1.5em 0',
                }}>
                    <div style={{
                        backgroundColor: 'forestgreen',
                        borderRadius: '15px',
                        padding: '0.25em 0.75em',
                        color: '#fff',
                        fontSize: 'small',
                    }}>{project.status}</div>
                </div>
                <p style={{marginBottom: '1.5rem'}}>{project.description}</p>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '1.5rem',
                    justifyContent: 'center',
                    width: '100%'
                }}>
                    <i className="fas fa-users" style={{marginRight: '10px'}}></i>
                    <progress value={project.participants} max={project.maxParticipants} style={{width: '100%', marginRight: '10px'}}></progress>
                    <span>{project.participants}/{project.maxParticipants}</span>
                </div>
                {project.isPrivate ? (
                    <button disabled style={{cursor: 'not-allowed'}}>🔒 Prywatny</button>
                ) : (
                    <button>Dołącz</button>
                )}
            </div>
        </div>
    );
};

export default ProjectDetails;