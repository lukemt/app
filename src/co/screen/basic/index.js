import s from './index.module.css'
import React from 'react'
import { connect } from 'react-redux'
import { setTheme } from '~local/actions'

class ScreenBasic extends React.Component {
    componentDidMount() {
        this._darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        this.onPrefersColorSchemeChange(this._darkModeMediaQuery)
        this._darkModeMediaQuery.addListener(this.onPrefersColorSchemeChange)
    }

    componentWillUnmount() {
        this._darkModeMediaQuery && this._darkModeMediaQuery.removeListener(this.onPrefersColorSchemeChange)
    }

    onPrefersColorSchemeChange = e => {
        const darkModeOn = e.matches
        if (this.props.autoTheme)
            this.props.setTheme(darkModeOn ? 'night' : '')
    }

    render() {
        const { className, children, theme, autoTheme, setTheme, ...etc } = this.props
        
        return (
            <div 
                {...etc} 
                className={s.page + ' ' + className}
                data-theme={theme}>
                {children}
            </div>
        )
    }
}

export default connect(
    state=>({
        theme: state.local.theme,
        autoTheme: state.local.autoTheme
    }),
    {
        setTheme
    }
)(ScreenBasic)