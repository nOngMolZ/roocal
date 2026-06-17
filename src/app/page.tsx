'use client'

import { useState } from 'react'

const GOLD = '#c9a84c'
const GOLD_LIGHT = '#f0d080'
const GOLD_DARK = '#8b6914'
const PANEL_BG = 'linear-gradient(160deg, #0e0b1e 0%, #08060f 100%)'
const HEADER_BG = 'linear-gradient(to right, #08060f, #1e0f3a, #2d1b4e, #1e0f3a, #08060f)'

function pierceColor(n: number) {
  if (n > 500) return '#ff6b6b'
  if (n > 250) return '#ffd700'
  return '#7fff7f'
}

function pierceShadow(n: number) {
  if (n > 500) return 'rgba(255,107,107,0.7)'
  if (n > 250) return 'rgba(255,215,0,0.7)'
  return 'rgba(127,255,127,0.7)'
}

export default function Home() {
  const [pdef, setPdef] = useState('')
  const [ePdefPct, setEPdefPct] = useState('')
  const [result, setResult] = useState<number | null>(null)
  const [calcKey, setCalcKey] = useState(0)
  const [error, setError] = useState('')

  function calculate() {
    setError('')
    const pdefVal = parseFloat(pdef)
    const ePctVal = ePdefPct.trim() === '' ? 100 : parseFloat(ePdefPct)

    if (!pdef.trim() || isNaN(pdefVal) || pdefVal <= 0) {
      setError('กรุณากรอก P.DEF ให้ถูกต้อง')
      return
    }
    if (isNaN(ePctVal) || ePctVal <= 0) {
      setError('กรุณากรอก E P.DEF% ให้ถูกต้อง (ต้องมากกว่า 0)')
      return
    }

    const divisor = 1 + ePctVal / 100
    const pierce = Math.ceil(pdefVal / divisor)

    setCalcKey(k => k + 1)
    setResult(pierce)
  }

  function reset() {
    setPdef('')
    setEPdefPct('')
    setResult(null)
    setError('')
  }

  const color = result !== null ? pierceColor(result) : '#7fff7f'
  const shadow = result !== null ? pierceShadow(result) : 'rgba(127,255,127,0.7)'
  const pdefVal = parseFloat(pdef) || 0
  const ePctVal = parseFloat(ePdefPct) || 0

  return (
    <div
      className="min-h-screen flex items-center justify-center py-8 px-4"
      style={{
        background: 'radial-gradient(ellipse at 50% 20%, #1e0a3c 0%, #0a0516 65%)',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Star dust background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 15% 20%, rgba(255,255,255,0.25) 0%, transparent 100%),
            radial-gradient(1px 1px at 45% 10%, rgba(255,255,255,0.2) 0%, transparent 100%),
            radial-gradient(1px 1px at 70% 35%, rgba(255,255,255,0.15) 0%, transparent 100%),
            radial-gradient(1px 1px at 25% 65%, rgba(255,255,255,0.18) 0%, transparent 100%),
            radial-gradient(1px 1px at 82% 55%, rgba(255,255,255,0.12) 0%, transparent 100%),
            radial-gradient(1px 1px at 55% 80%, rgba(255,255,255,0.14) 0%, transparent 100%),
            radial-gradient(1px 1px at 8%  88%, rgba(255,255,255,0.10) 0%, transparent 100%),
            radial-gradient(2px 2px at 38% 50%, rgba(201,168,76,0.12) 0%, transparent 100%),
            radial-gradient(2px 2px at 65% 72%, rgba(201,168,76,0.08) 0%, transparent 100%)
          `,
        }}
      />

      {/* Main card */}
      <div className="relative w-full" style={{ maxWidth: '400px' }}>
        <div
          style={{
            background: PANEL_BG,
            border: `2px solid ${GOLD}`,
            borderRadius: '18px',
            overflow: 'hidden',
            boxShadow: `0 0 50px rgba(201,168,76,0.12), 0 20px 60px rgba(0,0,0,0.6)`,
          }}
        >
          {/* Header */}
          <div
            style={{
              background: HEADER_BG,
              borderBottom: `2px solid ${GOLD}`,
              padding: '18px 20px',
              textAlign: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              <span style={{ fontSize: '26px' }}>⚔️</span>
              <div>
                <h1
                  style={{
                    color: GOLD_LIGHT,
                    fontSize: '20px',
                    fontWeight: 'bold',
                    letterSpacing: '0.15em',
                    textShadow: `0 0 14px rgba(240,208,128,0.85)`,
                    fontFamily: 'var(--font-cinzel)',
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  ARMOR PIERCE
                </h1>
                <p style={{ color: GOLD_DARK, fontSize: '10px', letterSpacing: '0.22em', margin: '3px 0 0', textTransform: 'uppercase' }}>
                  Ragnarok Origin • Calculator
                </p>
              </div>
              <span style={{ fontSize: '26px' }}>🛡️</span>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: '22px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Input 1: P.DEF */}
            <div>
              <label style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                color: GOLD, fontSize: '13px', fontWeight: '600', marginBottom: '8px',
              }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: '20px', height: '20px', borderRadius: '5px',
                  background: '#180e02', border: `1px solid ${GOLD}`,
                  fontSize: '11px', fontWeight: 'bold', flexShrink: 0, color: GOLD,
                }}>1</span>
                P.DEF (เกราะกายภาพของศัตรู)
              </label>
              <input
                type="number"
                inputMode="numeric"
                value={pdef}
                onChange={e => { setPdef(e.target.value); setError('') }}
                onKeyDown={e => e.key === 'Enter' && calculate()}
                placeholder="เช่น  2102"
                style={{
                  width: '100%', boxSizing: 'border-box',
                  padding: '15px 16px',
                  background: '#04030a',
                  border: '1.5px solid #2a1a08',
                  borderRadius: '10px',
                  color: GOLD_LIGHT,
                  fontSize: '24px', fontWeight: 'bold',
                  textAlign: 'center',
                  outline: 'none',
                  caretColor: GOLD,
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  fontFamily: 'var(--font-cinzel)',
                }}
                onFocus={e => {
                  e.target.style.borderColor = GOLD
                  e.target.style.boxShadow = `0 0 0 1px rgba(201,168,76,0.25), 0 0 12px rgba(201,168,76,0.1)`
                }}
                onBlur={e => {
                  e.target.style.borderColor = '#2a1a08'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>

            {/* Input 2: E P.DEF% */}
            <div>
              <label style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                color: GOLD, fontSize: '13px', fontWeight: '600', marginBottom: '8px',
              }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: '20px', height: '20px', borderRadius: '5px',
                  background: '#180e02', border: `1px solid ${GOLD}`,
                  fontSize: '11px', fontWeight: 'bold', flexShrink: 0, color: GOLD,
                }}>2</span>
                E P.DEF%
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="number"
                  inputMode="decimal"
                  value={ePdefPct}
                  onChange={e => { setEPdefPct(e.target.value); setError('') }}
                  onKeyDown={e => e.key === 'Enter' && calculate()}
                  placeholder="เช่น 18"
                  min="0"
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    padding: '15px 44px 15px 16px',
                    background: '#04030a',
                    border: '1.5px solid #2a1a08',
                    borderRadius: '10px',
                    color: GOLD_LIGHT,
                    fontSize: '24px', fontWeight: 'bold',
                    textAlign: 'center',
                    outline: 'none',
                    caretColor: GOLD,
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    fontFamily: 'var(--font-cinzel)',
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = GOLD
                    e.target.style.boxShadow = `0 0 0 1px rgba(201,168,76,0.25), 0 0 12px rgba(201,168,76,0.1)`
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = '#2a1a08'
                    e.target.style.boxShadow = 'none'
                  }}
                />
                <span style={{
                  position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                  color: GOLD_DARK, fontSize: '20px', fontWeight: 'bold', pointerEvents: 'none',
                  fontFamily: 'var(--font-cinzel)',
                }}>%</span>
              </div>
            </div>

            {/* Formula hint */}
            <div style={{
              background: '#06050e', border: '1px solid #14102a',
              borderRadius: '8px', padding: '8px 14px', textAlign: 'center',
            }}>
              <span style={{ color: '#3a3550', fontSize: '12px' }}>สูตร: </span>
              <span style={{ color: '#6b5a3a', fontSize: '12px', fontFamily: 'monospace', letterSpacing: '0.03em' }}>
                P.DEF ÷ (1 + E P.DEF%)
              </span>
            </div>

            {/* Error message */}
            {error && (
              <p style={{ color: '#ff6b6b', fontSize: '12px', textAlign: 'center', margin: '-4px 0' }}>
                ⚠️ {error}
              </p>
            )}

            {/* Calculate button */}
            <button
              onClick={calculate}
              style={{
                width: '100%',
                padding: '16px',
                background: `linear-gradient(to bottom, #e5b84a 0%, #c9a02a 45%, #9a7510 100%)`,
                color: '#0a0516',
                border: `1px solid ${GOLD_LIGHT}`,
                borderRadius: '10px',
                fontSize: '18px', fontWeight: 'bold',
                letterSpacing: '0.12em',
                cursor: 'pointer',
                boxShadow: `0 4px 18px rgba(201,168,76,0.35), inset 0 1px 0 rgba(255,255,255,0.15)`,
                fontFamily: 'var(--font-cinzel)',
                transition: 'transform 0.1s, box-shadow 0.1s',
              }}
              onMouseDown={e => {
                e.currentTarget.style.transform = 'scale(0.97)'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(201,168,76,0.2)'
              }}
              onMouseUp={e => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = '0 4px 18px rgba(201,168,76,0.35), inset 0 1px 0 rgba(255,255,255,0.15)'
              }}
              onTouchStart={e => {
                e.currentTarget.style.transform = 'scale(0.97)'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(201,168,76,0.2)'
              }}
              onTouchEnd={e => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = '0 4px 18px rgba(201,168,76,0.35), inset 0 1px 0 rgba(255,255,255,0.15)'
              }}
            >
              ⚡ คำนวณ
            </button>

            {/* Result panel */}
            {result !== null && (
              <div
                key={calcKey}
                className="result-pop"
                style={{
                  background: 'linear-gradient(135deg, #060410 0%, #0b091e 100%)',
                  border: `2px solid ${color}`,
                  borderRadius: '14px',
                  padding: '20px 16px',
                  textAlign: 'center',
                  boxShadow: `0 0 25px ${shadow.replace('0.7', '0.15')}`,
                }}
              >
                <p style={{
                  color: '#6b7fa3', fontSize: '11px',
                  letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '10px',
                }}>
                  ต้องการเจาะเกราะ
                </p>

                {/* Main number */}
                <div
                  className="glow-pulse"
                  style={{
                    color,
                    fontSize: '64px', fontWeight: 'bold',
                    lineHeight: 1.05,
                    textShadow: `0 0 20px ${shadow}, 0 0 45px ${shadow.replace('0.7', '0.3')}`,
                    fontFamily: 'var(--font-cinzel)',
                  }}
                >
                  {result.toLocaleString()}
                </div>

                <p style={{
                  color: '#3a3550', fontSize: '11px',
                  letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '6px',
                }}>
                  IGNORE DEF / ARMOR PIERCE
                </p>

                {/* Formula breakdown */}
                <div style={{
                  marginTop: '10px', padding: '8px 12px',
                  background: 'rgba(0,0,0,0.3)', borderRadius: '6px',
                  fontSize: '11px', color: '#4a3a60', fontFamily: 'monospace',
                }}>
                  {pdefVal.toLocaleString()} ÷ {(1 + ePctVal / 100).toFixed(2)} = {(pdefVal / (1 + ePctVal / 100)).toFixed(2)} → <span style={{ color }}>{result}</span>
                </div>

                {/* Progress bars */}
                <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', marginTop: '14px' }}>
                  {[100, 200, 300, 400, 500].map((threshold) => (
                    <div
                      key={threshold}
                      style={{
                        height: '5px', width: '44px', borderRadius: '3px',
                        background: result >= threshold ? color : '#1a1228',
                        boxShadow: result >= threshold ? `0 0 6px ${shadow}` : 'none',
                        transition: 'background 0.3s',
                      }}
                    />
                  ))}
                </div>

                {/* Reset */}
                <button
                  onClick={reset}
                  style={{
                    marginTop: '14px',
                    background: 'transparent',
                    border: '1px solid #2a2040',
                    borderRadius: '6px',
                    color: '#4a3a60',
                    fontSize: '11px', letterSpacing: '0.15em',
                    padding: '5px 16px',
                    cursor: 'pointer',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = GOLD_DARK
                    e.currentTarget.style.borderColor = GOLD_DARK
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = '#4a3a60'
                    e.currentTarget.style.borderColor = '#2a2040'
                  }}
                >
                  ✕ RESET
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, #2d1b4e, transparent)' }} />
          <div style={{ padding: '8px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: '#20183a', fontSize: '10px', letterSpacing: '0.1em' }}>RO ORIGIN</span>
            <span style={{ color: '#20183a', fontSize: '10px' }}>⚔️</span>
            <span style={{ color: '#20183a', fontSize: '10px', letterSpacing: '0.1em' }}>MOBILE CALC</span>
          </div>
        </div>
      </div>
    </div>
  )
}
