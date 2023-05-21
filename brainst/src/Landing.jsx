import React, { useEffect, useState } from 'react'
import './App.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Footer from './Footer';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Landing() {
    const [state, setState] = useState([])
    const [Second, setSecond] = useState([])
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [third, setthird] = useState(false)
    const [four, setfour] = useState(false)
    const [first, setfirst] = useState(0)
    useEffect(() => {
        fetch(`https://api.spacexdata.com/v4/capsules`)
            .then((e) => e.json())
            .then((e) => { setState(e); console.log(e) })
            .catch((e) => console.log(e.message))
    }, [])
    const pagination = (word) => {
        if (word == 'pre') {
            if (first != 0) {
                setfirst(first - 10)
                setSecond([])
            }
        }
        if (word == 'one') {
            if (first != 0) {
                setfirst(first - 10)
                setSecond([])
            }
        }
        if (word == 'two') {
            if (first != 10) {
                setfirst(first + 10)
                setSecond([])
            }
        }
        if (word == 'next') {
            if (first != 10) {
                setfirst(first + 10)
                setSecond([])
            }
        }
    }
    const change = (i) => {
        const fil = state.filter((e) => e.status == i)
        setSecond(fil)
    }
    const changeByOriginal = (i) => {
        const fil = state.filter((e) => e.original_launch == i)
        setSecond(fil)
    }
    const changeByType = (i) => {
        const fil = state.filter((e) => e.type == i)
        setSecond(fil)
    }
    return (
        <div className='container-md'>
            <header className='header' style={{ fontSize: '1.2em' ,color:'white'}}>
                <div>
                    <img src="https://thumbs.dreamstime.com/b/illustration-deep-space-spacex-logo-over-vector-planet-195641418.jpg" className='imgLogo' />
                </div>
                <div style={{position:'relative'}}>
                    <p onMouseOver={()=>setthird(true)} onMouseOut={()=>setthird(false)}>Home</p>
                    {third ==false ?" ":<p style={{position:'absolute',padding:'10px',backgroundColor:'white',color:'black',borderRadius:'.3em'}}>welcome</p>}
                </div>
                <div className='about'>
                    <p onMouseOver={()=>setfour(true)} onMouseOut={()=>setfour(false)}>About us</p>
                    {four ==false ?" ":<p style={{position:'absolute',padding:'10px',backgroundColor:'white',color:'black',borderRadius:'.3em'}}>spaceX</p>}
                </div>
                <div className='contact'>
                    <p>Contact us</p>
                </div>
                <div className='logout'>
                    <p>Logout</p>
                </div>
            </header>
            <hr />
            <section style={{ marginTop: '5%', marginBottom: '5%' }} className='cont'>

                <div className='qout'>
                    <p style={{fontFamily:'cursive',color:'white'}}>"Mars is within reach. It's time for humanity to take the next giant leap." - Elon Musk</p>
                </div>
                <div >
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbTywaX1fJjHJmiiek2CwNGBbXMEfpVXAfD3N3AHIEQzqJScOql5lC3Yx7q2edjXqO_E4&usqp=CAU" className='mainImg' />
                </div>
            </section>
            <hr />
            <section style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '5%', marginBottom: '5%' }}>
                <div className='inp'><input onChange={(e) => change(e.target.value)} type="text" placeholder='Enter capsules status' className='field' /></div>
                <div className='inp'><input onChange={(e) => changeByOriginal(e.target.value)} type="text" placeholder='Enter capsules original_launch' className='field' /></div>
                <div className='inp'><input onChange={(e) => changeByType(e.target.value)} type="text" placeholder='Enter capsules type' className='field' /></div>
            </section>
            <hr />
            <main style={{ marginTop: '5%' }}>
                {Second.length == 0 ? <div className='data'>
                    {state.slice(first, first + 10).map((e) => {
                        return (
                            <div className='spax'>{e.last_update}
                                <Button onClick={handleOpen}>Details</Button>
                                <Modal
                                    keepMounted
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="keep-mounted-modal-title"
                                    aria-describedby="keep-mounted-modal-description"
                                >
                                    <Box sx={style}>
                                        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                                            last_update : {e.last_update}
                                            <p>serial : {e.serial}</p>

                                        </Typography>
                                        <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                                            <p>status : {e.status}</p>
                                            <p>type : {e.type}</p>
                                            <p>water_landings : {e.water_landings}</p>

                                        </Typography>
                                    </Box>
                                </Modal>
                            </div>
                        )
                    })}
                </div> : <div className='data'>
                    {Second.map((e) => {
                        return (
                            <div className='spax'>
                                {e.last_update}
                                <Button onClick={handleOpen}>Details</Button>
                                <Modal
                                    keepMounted
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="keep-mounted-modal-title"
                                    aria-describedby="keep-mounted-modal-description"
                                >
                                    <Box sx={style}>
                                        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                                            last_update : {e.last_update}
                                            <p>serial : {e.serial}</p>

                                        </Typography>
                                        <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                                            <p>status : {e.status}</p>
                                            <p>type : {e.type}</p>
                                            <p>water_landings : {e.water_landings}</p>

                                        </Typography>
                                    </Box>
                                </Modal>
                            </div>
                        )
                    })}
                </div>}
            </main>
            <section style={{ display: 'flex', justifyContent: 'center', marginTop: '4%', marginBottom: '5%' }}>
                <div style={{ width: '30%', marginLeft: '14%' }}>
                    <button onClick={() => pagination('pre')} style={{ height: '40px' }}>Previous</button>
                    <button onClick={() => pagination('one')} style={{ marginLeft: '2%', width: '13%', height: '40px' }}>1</button>
                    <button onClick={() => pagination('two')} style={{ marginLeft: '2%', width: '13%', height: '40px' }}>2</button>
                    <button onClick={() => pagination('next')} style={{ marginLeft: '2%', width: '20%', height: '40px' }}>Next</button>
                </div>
            </section>
        </div>
    )
}
