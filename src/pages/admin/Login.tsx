import { ArrowLeft, Eye, EyeOff, Lock, User } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../components/Logo'
import { IMG } from '../../data/images'
import { login } from '../../lib/auth'
import SafeImage from '../../components/SafeImage'

export default function Login({ onSuccess }: { onSuccess: () => void }) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      if (login(user, pass)) onSuccess()
      else {
        setError('Usuário ou senha incorretos.')
        setLoading(false)
      }
    }, 600)
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-forest lg:block">
        <SafeImage src={IMG.fogao} alt="Fogão a lenha com panelas de ferro" className="absolute inset-0 !bg-forest" eager />
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/50 to-forest/40" />
        <div className="relative flex h-full flex-col justify-between p-12 text-cream">
          <Logo />
          <div>
            <h2 className="text-4xl font-bold leading-tight">Gerencie o cardápio, as fotos e as informações do seu restaurante.</h2>
            <p className="mt-4 max-w-md text-cream/75">Alterações feitas aqui aparecem imediatamente na vitrine pública.</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center bg-cream px-6 py-12">
        <div className="w-full max-w-sm animate-fade-up">
          <div className="mb-10 lg:hidden">
            <Logo light={false} />
          </div>
          <span className="eyebrow">Painel administrativo</span>
          <h1 className="mt-4 text-4xl font-bold">Bem-vindo de volta</h1>
          <p className="mt-2 text-sm text-forest/65">Acesse com as credenciais de demonstração.</p>

          <form onSubmit={submit} className="mt-8 space-y-5">
            <div>
              <label className="label" htmlFor="u">Usuário</label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-forest/40" />
                <input id="u" className="field pl-10" autoComplete="username" value={user} onChange={(e) => setUser(e.target.value)} placeholder="admin" autoFocus />
              </div>
            </div>
            <div>
              <label className="label" htmlFor="p">Senha</label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-forest/40" />
                <input id="p" className="field px-10" type={show ? 'text' : 'password'} autoComplete="current-password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="••••••" />
                <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-forest/45 hover:text-forest" aria-label={show ? 'Ocultar senha' : 'Mostrar senha'}>
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            {error && <p role="alert" className="rounded-xl bg-red-100 px-4 py-2.5 text-sm text-red-800">{error}</p>}
            <button className="btn-green w-full py-3.5" disabled={loading}>
              {loading ? 'Entrando…' : 'Entrar'}
            </button>
          </form>

          <div className="mt-6 rounded-2xl border border-gold/50 bg-gold/10 p-4 text-xs leading-relaxed text-forest/80">
            <p className="font-bold text-brown">Ambiente de demonstração</p>
            <p className="mt-1">Usuário: <b>admin</b> · Senha: <b>123456</b></p>
            <p className="mt-1">Login simulado no navegador. Os dados ficam apenas neste dispositivo, não há servidor nem segurança real.</p>
          </div>

          <Link to="/" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-forest/70 transition hover:text-forest">
            <ArrowLeft className="h-4 w-4" /> Voltar ao site
          </Link>
        </div>
      </div>
    </div>
  )
}
