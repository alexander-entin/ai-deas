export default function ThreeDots() {
    return (
        <>
            {[0, 0.2, 0.4].map(i =>
                <div
                    key={i}
                    style={{ '--x': `${i}s` }}
                    className={`animate-[bounce_1s_infinite_var(--x)] w-1.5 h-1.5 m-1 mt-3 bg-current inline-block rounded-full border-radius-50`}
                />
            )}
        </>
    )
}