import { style } from "@vanilla-extract/css";

export const mainProjects = style({
    display: 'flex',
    flexDirection:'column',
    padding:'70px 140px',
    alignItems:'flex-start',
    width: '100vw',
    height: '90vh',
})
export const headProjects = style({
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:'100%'
})
export const buttonContainer = style({
    width:'50vh',
    display: 'flex',
    justifyContent:'space-between',
    flexDirection: 'row'
})
export const buttonProjects = style({
    display: 'block',
    cursor: 'pointer',
    fontSize: '20px',
    borderRadius: '12px',
    border: 'none',
    outline: 'none',
    color: 'white',
    backgroundColor:'black',
    padding: '15px 25px',

})
export const yourProjects = style({
    fontSize: '40px',
})
export const searchContainer = style({
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    width:'20vw'
})
export const filterBox = style({

})
export const tagBox = style({

    width:'5vw',
})
export const table = style({

})