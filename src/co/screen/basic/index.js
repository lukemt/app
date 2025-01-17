import s from './index.module.css'
import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { setTheme } from '~local/actions'

import Header from './header'
import Dialog from '~co/overlay/dialog'

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
        const app = e.matches ? 'night' : 'day'

        if (this.props.rehydrated)
            if (this.props.theme.auto || (this.props.theme.app == app && this.props.theme.sidebar == app))
                this.props.setTheme({ app, sidebar: app, auto: true })
    }

    render() {
        const { className='', children, theme, appSize, setTheme, rehydrated, ...etc } = this.props
        
        return (
            <>
                <Helmet defer={false}>
                    <html
                        data-theme={theme.app}
                        data-app-size={appSize} />
                    <meta name='theme-color' content={theme.app == 'night' ? '#303030' : '#FFFFFF'} />
                </Helmet>

                <div 
                    {...etc}
                    data-is-page
                    className={s.page + ' ' + className}>
                    {children}

                    <Dialog />
                </div>
            </>
        )
    }
}

export default connect(
    (state, { appSize })=>({
        rehydrated: state._persist.rehydrated,
        theme: state.local.theme,
        appSize: appSize || state.local.appSize,
    }),
    {
        setTheme
    }
)(ScreenBasic)

export { Header }