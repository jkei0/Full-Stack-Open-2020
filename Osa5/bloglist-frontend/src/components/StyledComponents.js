import styled from 'styled-components'

const Button = styled.button`
  color: black;
  background-color: silver;
  font-size: 1em;
  margin: 3em;
  padding: 0.3em, 1.2em;
  border-radius: 2em;
  margin: 0 0.3em 0.3em 0;
  display: inline-block;
  transition: all 0.2s;
  box-sizing: border-box;
`

const FooterStyle = styled.div`
  background: lightblue;
  padding: 1em;
`

const PageStyle = styled.div`
  background: cornsilk;
  padding: 1em;
`

const Navigation = styled.div`
  background: LavenderBlush;
  padding: 0.5em
`

const NotificationStyle = styled.div`
    width: 100%;
    padding: 12px 16px;
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    margin-bottom: 12px;
    font-size: 16px;
    background-color: rgba(227, 253, 235, 1);
    border-color: rgba(38, 179, 3, 1);
    color: rgba(60, 118, 61, 1);
`

const ErrorStyle = styled.div`
    width: 100%;
    padding: 12px 16px;
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    margin-bottom: 12px;
    font-size: 16px;
    background-color: rgba(248, 215, 218, 1);
    border-color: rgba(220, 53, 69, 1);
    color: rgba(114, 28, 36,1);
`

export {
  Button,
  FooterStyle,
  PageStyle,
  Navigation,
  NotificationStyle,
  ErrorStyle
}