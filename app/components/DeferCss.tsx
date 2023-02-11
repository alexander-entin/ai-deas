export default function DeferCss({ href }) {
    console.log('DeferCss', href)
    return <script dangerouslySetInnerHTML={{
        __html: `</script><link rel="preload" href="${href}" as="style" onload="console.log(this);this.onload=null;this.rel='stylesheet'" crossorigin="anonymous"/><script>`,
    }} />
}
