import styled from 'styled-components';

export const Container = styled.div`
    h1 {
        text-align: center;
        font-size: 3.2em;
        line-height: 1.1;
    }

    ul { 
        
        list-style: none;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        column-gap: 3rem;
        row-gap: 3rem;
        
    }

    li {
        padding: 1rem;
        display: grid;
        align-items: center;
        width: 200px;
        background-color: #494496;
        border-radius: 1rem;
        
    }

    span {
        font-weight: bold;
       
    }

    li:hover {
        transform: scale(1.1);
    }
    
    
`

export const Button = styled.button`
    
        cursor: pointer;
        background-color: #252159;
        border-radius: 0.5rem;
        border: 0;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-right: 0rem;
    
` 

export const Pages = styled.button`
        cursor: pointer;
        background-color: #252159;
        border-radius: 0.5rem;
        border: 0;
        padding: 0.5rem;
        display: flex;
        flex-direction: row;
        margin-bottom: 0.6rem;
        
` 
