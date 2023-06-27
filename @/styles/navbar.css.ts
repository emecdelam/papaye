import { style } from "@vanilla-extract/css";

export const mainNav = style({
    display: 'flex',
    justifyContent:'space-between',
    padding:'0 20px',
    alignItems:'center',
    width: '100vw',
    height: '3.5rem',
    borderBottom:'1px solid #D8D8E6'
})
export const containerHeight = style({
    display:'flex',


})
export const editorName = style({
    display:'flex',
    justifyContent:'center',
    width:'16vw'

})
export const links = style({
    display:'flex',
    justifyContent:'space-around',
    width:'10vw',
    textDecoration: 'none',
    color: 'inherit',

})
export const inactiveLink = style({
    color:'#717176',
    transition: 'color 0.1s ease',
    ":hover":{
        cursor: 'pointer',
        color: '#000000'
    }
})
export const profilePicture = style({
    borderRadius: '100%',
})