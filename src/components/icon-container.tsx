export default function IconContainer({ content }: { content: JSX.Element }) {
    return (
        <div className="bg-white/10 rounded-xl p-4 border border-white/20 w-full justify-center items-center flex hover:scale-110 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:cursor-pointer group">
            <div className="group-hover:scale-110 transition-transform duration-300">
                {content}
            </div>
        </div>
    )
}