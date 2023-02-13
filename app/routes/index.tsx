import type { ActionArgs } from '@remix-run/cloudflare'
import { useEffect, useCallback, useRef, Fragment, Children } from 'react'
import { atom, useAtom } from 'jotai'
import { useLocalStorage } from 'usehooks-ts'
import TextArea from 'react-textarea-autosize'
import { json } from '@remix-run/cloudflare'
import { Form, useActionData, useSubmit, useTransition } from '@remix-run/react'
import { ClientOnly } from 'remix-utils'
import Markdown from 'markdown-to-jsx'
import { BiCog, BiSend, BiTrash, BiErrorAlt } from 'react-icons/bi'
import AdSense from 'react-adsense'

import fetch from '~/tools/fetch'
import get from '~/tools/get'
import ThreeDots from '~/components/ThreeDots'
import logo from "~/../public/logo.svg"

const base = 'https://api.openai.com/v1/'
export const action = async ({ request, context }: ActionArgs) => {
	let data = await request.formData()
	console.log(data)
	let prompt = data.get('prompt')?.toString()
	let model = data.get('model') || "text-davinci-003"
	let temperature = +(data.get('temperature') || 0.5)

	// if (prompt?.endsWith('\nYou: 1')) {
	// 	return json({
	// 		ai: '# This is an example of markdown\n' +
	// 			'This sentence is written in *italic*, while this sentence is written in **bold**. \n' +
	// 			'\n' +
	// 			'[This is a link](https://www.markdownguide.org/basic-syntax/)\n' +
	// 			'\n' +
	// 			"Here's a code block: \n" +
	// 			'\n' +
	// 			'```jsx\n' +
	// 			"const foo = 'bar'; \n" +
	// 			'console.log(foo); \n' +
	// 			'```',
	// 	})
	// }
	// if (prompt?.endsWith('\nYou: e')) model = 1

	let body = {
		prompt: `${prompt} (answer in markdown)\nAI:`,
		model,
		temperature,
		stop: ['\nYou:'],
		max_tokens: 1000,
		// suffix,
	}
	console.log('body', body)

	let response = await fetch(base + 'completions', {
		auth: context.OPENAI_API_KEY,
		body,
	})
	console.log('response', response)

	let { ok, status } = response
	let result = ok ? { ai: response.data.choices[0].text } : response
	console.log('result', result)
	return json(result, { status })
}

function You({ children }) {
	return (
		<div className="chat chat-end">
			<div className="chat-bubble chat-bubble-secondary">
				{children}
			</div>
		</div>
	)
}

function Ai({ children }) {
	return (
		<div className="chat chat-start">
			<div className="chat-bubble">
				<div className="prose">
					{children}
				</div>
			</div>
		</div>
	)
}

let examples = [
	'Що таке правий лібералізм?',
	'Запропонуй 5 кличок для бойового кота',
	'Реалізуй Python функцію, яка рахує, скільки днів залишилось до нового року',
]

let prolog = [
	{
		you: <>
			OpenAI, розробник ChatGPT, <a className="link" href="https://forbes.ua/news/amerikanskiy-openai-poyasniv-chomu-zablokuvav-nadpopulyarniy-shi-servis-chatgpt-dlya-ukraintsiv-18012023-11148" target="_blank" rel="noreferrer">заблокував</a> українцям доступ до свого текстового ШІ - чатботу. Існуючі способи обходу блокування... <a className="link" href="https://psm7.com/uk/technology/kak-vospolzovatsya-chatgpt-v-ukraine-obxod-blokirovki-openai.html" target="_blank" rel="noreferrer">неідеальні</a>. Що робити?
		</>
	},
	{
		ai: 'Тут українці можуть користуватися ChatGPT без зайвого клопоту - без VPN, SMS, реєстрації'
	},
	{
		you: 'І чим цей сайт крашій за Мерліна чи Телеграм-ботів?'
	},
	{
		ai: `Мерлін використовує менш розумну модель (не робіть висновки про ChatGPT по Мерліну), не пам'ятає історію спілкування, та після 11 запитів потрібно платити $19. У ботів ті самі проблеми.`
	},
	{
		you: 'То це безкоштовно чи що?'
	},
	{
		ai: <>
			ChatGPT API не є безкоштовним. Один запит може коштувати до 1 Арестовича (2-3 грн) в залежності від моделі та контексту. Я не можу платити за всіх. То прошу <a href="https://send.monobank.ua/jar/6vjEGRovZy" target="_blank" rel="noreferrer">ДОНАТИТИ</a>.
		</>
	},
	{
		you: 'І як цим користуватися? Він дійсно розуміє українську?'
	},
	{
		ai: 'Нажаль, українською він розмовляє не дуже добре. Якщо вмієте, то краще спілкуйтеся англійською. Просто спробуйте щось спитати. Наприклад:',
		examples: ({ onExample }) => <>
			<ul>
				{examples.map((x, i) =>
					<li
						className="link"
						onClick={() => onExample(x)}
						key={i}
					>
						{x}
					</li>
				)}
			</ul>
		</>
	}
]

export let ErrorBoundary = Chat

let promptAtom = atom('')
let lastAtom = atom('')
let logAtom = atom(prolog)

export default function Chat({ error }) {
	let [prompt, setPrompt] = useAtom(promptAtom)
	let [model, setModel] = useLocalStorage('model', 'text-davinci-003')
	let [temperature, setTemperature] = useLocalStorage('temperature', 0.5)
	let [log, setLog] = useAtom(logAtom)
	let [last, setLast] = useAtom(lastAtom)
	let submit = useSubmit()
	let { submission } = useTransition()
	let res = useActionData<typeof action>()
	if (res?.error) error = res.error
	let { message, ...rest } = error || {}
	let bottomRef = useRef()
	let promptRef = useRef()

	// console.log({ prompt, model, temperature, log, last, submission, res, error })

	let prettify = () => {
		setTimeout(() => {
			window.Prism?.highlightAll()
			bottomRef.current?.scrollIntoView({ behavior: "smooth" })
		}, 1)
	}

	useEffect(() => {
		if (res && !res.error) {
			let prompt = get(setPrompt)
			setLog(log => [...log, { you: prompt }, res])
			setLast(prompt)
			setPrompt('')
			prettify()
		}
	}, [res, setPrompt, setLog, setLast])

	let onExample = prompt => {
		prettify()
		setPrompt(prompt)
		promptRef.current?.focus()
	}

	let onSubmit = useCallback(() => {
		prompt = prompt.trim()
		if (!prompt) return
		let len = prompt.length
		let context = []
		for (let i = 1; i <= 6; i++) {
			let j = log.length - i
			if (j < 0) break
			let { you, ai, examples } = log[j]
			if (examples) break
			len += (you || ai || '').length
			if (len > 2000) break
			context.push(you ? `You: ${you}` : ai ? `AI: ${ai}` : '')
		}
		context = context.reverse().join('\n')
		let data = new FormData()
		data.set('prompt', `${context}\nYou: ${prompt}`)
		data.set('model', model)
		data.set('temperature', temperature)
		submit(data, { method: "post", replace: true })
		// console.log('ad', log.length, log.length % 4)
		// if (log.length && (log.length % 4) <= 1) {
		// 	setLog([...log, { ad: 1 }])
		// }
		prettify()
	}, [prompt, model, temperature, log, setLog, submit])

	let onKey = useCallback(e => {
		if (e.key === 'ArrowUp' && prompt === '') {
			e.preventDefault()
			setPrompt(last)
			// setTimeout(() => {
			// 	promptRef.current.selectionStart = 1e3
			// 	promptRef.current.selectionEnd = 1e3
			// }, 1)
		} else if (e.which === 13 && !e.shiftKey) {
			e.preventDefault()
			if (!submission) {
				onSubmit()
			}
		}
	}, [prompt, last, submission, setPrompt, onSubmit])

	let onClear = () => setLog([])

	useEffect(() => {
		if (error && !res) {
			prettify()
		}
	}, [res, error])

	// rest = JSON.stringify(rest, null, 2).split('\n').slice(1, -1).map(x => x.slice(2)).join('\n')

	return (
		<Form
			method="post"
			className="drawer drawer-end bg-base-100/90"
			data-theme="halloween"
			replace
			onSubmit={onSubmit}
			disabled={!!submission}
		>
			<input id="drawer" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content flex flex-col overflow-hidden">
				{(error && !submission) &&
					<div className="toast toast-top toast-center z-50">
						<div className="alert alert-error">
							<div tabIndex={0} className="collapse gap-0">
								<div className="collapse-title flex flex-row p-0 min-h-0">
									<BiErrorAlt className="h-6 w-6" />
									<span className="whitespace-pre pl-2">
										Щось пішло не так
										{res?.status &&
											<code> ({res.status})</code>
										}
									</span>
								</div>
								<div className="collapse-content p-0 pt-1 -mb-4">
									<code>{message}</code>
									{/* <div>
										<pre>
											<code className="scroll-auto">
												{rest}
											</code>
										</pre>
									</div> */}
								</div>
							</div>
						</div>
					</div>
				}
				<div className="flex-1 overflow-auto scrollbar-thin">
					<div className="md:container">
						<Ai>
							<h1>
								<img src={logo} className="inline m-0 w-16 h-16" alt="" />
								<span className="pl-4">ChatGPT солов'їною</span>
							</h1>
						</Ai>
						{log.map(({ you, ai, examples, ad }, i) =>
							<Fragment key={i}>
								{you &&
									<You>{you}</You>
								}
								{ai &&
									<Ai>
										{typeof (ai) === 'string'
											? <Markdown>{ai}</Markdown>
											: ai
										}
										{examples && examples({ onExample })}
									</Ai>
								}
								{/* {ad &&
									<div className="chat chat-start">
										<div className="chat-bubble">
											<AdSense.Google
												client="ca-pub-6409897183054012"
												slot="9024127096"
												layoutKey="-6v+ed+2i-1n-4w"
												format="fluid"
											/>
										</div>
									</div>
								} */}
							</Fragment>
						)}
						{submission &&
							<>
								<You>{prompt}</You>
								<Ai><ThreeDots /></Ai>
							</>
						}
						<div ref={bottomRef} />
					</div>
				</div>
				<div className="md:container flex items-end p-1">
					<label htmlFor="prompt" className="sr-only">
						Ваше повідомлення
					</label>
					<TextArea
						id="prompt"
						name="prompt"
						value={submission ? '' : prompt}
						onChange={e => setPrompt(e.target.value)}
						className="flex-1 max-w-full chat-bubble scrollbar-thin focus:outline-none"
						rows={1}
						minRows={1}
						maxRows={5}
						maxLength={500}
						placeholder="Ваше повідомлення..."
						autoFocus
						required
						onKeyDown={onKey}
						ref={promptRef}
					/>
					<div className="flex flex-col absolute bottom-0 right-0 p-1.5 pr-0.5">
						<button
							type="button"
							className="p-2 text-neutral-content rounded-full cursor-pointer"
							onClick={onClear}
						>
							<BiTrash className="w-6 h-6" />
							<span className="sr-only">Clear conversation</span>
						</button>
						<label
							htmlFor="drawer"
							className="drawer-button p-2 text-neutral-content rounded-full cursor-pointer"
						>
							<BiCog className="w-6 h-6" />
							<span className="sr-only">Settings</span>
						</label>
						<button
							type="submit"
							className="p-2 text-neutral-content rounded-full cursor-pointer"
							disabled={!!submission}
						>
							<BiSend className="w-6 h-6" />
							<span className="sr-only">Send message</span>
						</button>
					</div>
				</div>
			</div>
			<div className="drawer-side">
				<label htmlFor="drawer" className="drawer-overlay !bg-base-100/70"></label>
				<ClientOnly>
					{() =>
						<div className="bg-base-300 w-80 p-4">
							<div className="form-control">
								<label className="label" htmlFor="model">
									<span className="label-text">Модель</span>
								</label>
								<select
									id="model"
									name="model"
									value={model}
									onChange={e => setModel(e.target.value)}
									className="select select-bordered w-full max-w-xs"
								>
									{/* <option disabled>GPT-3</option> */}
									<option value="text-davinci-003">text-davinci-003 (розумна)</option>
									<option value="text-curie-001">text-curie-001</option>
									<option value="text-babbage-001">text-babbage-001</option>
									<option value="text-ada-001">text-ada-001 (швидка)</option>
									{/* <option disabled>CODEX</option> */}
									<option value="code-davinci-002">code-davinci-002</option>
									<option value="code-cushman-001">code-cushman-001</option>
								</select>
							</div>
							<div className="form-control">
								<label className="label" htmlFor="range">
									<span className="label-text">Температура</span>
								</label>
								<input
									id="range"
									type="range"
									name="temperature"
									value={temperature}
									onChange={e => setTemperature(e.target.value)}
									min={0} max={1} step={0.01}
									className="range range-primary"
								/>
								<label className="label">
									<span className="label-text-alt">Детермінізм</span>
									<span className="label-text-alt">Варіативність</span>
								</label>
							</div>
							<div className="absolute bottom-0 right-0 p-4">
								<a href="mailto:ai-musement@gmail.com" target="_blank" rel="noreferrer">
									ai-musement@gmail.com
								</a>
							</div>
						</div>
					}
				</ClientOnly>
			</div>
		</Form>
	)
}
