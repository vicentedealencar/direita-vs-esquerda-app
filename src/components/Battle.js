import React, { useEffect, useState } from 'react'

const useActiveBattle = () => {
    const [activeBattle, setActiveBattle] = useState(null)

    useEffect(() => {
        let ignore = false;
        const fetchData = async () => {
            const result = await fetch('https://direita-vs-esquerda-api.herokuapp.com/api/v1/battles')
            const battles = await result.json()
            const activeBattle = battles.find(x => x.active)
            console.log(activeBattle)
            if (!ignore) {
                setActiveBattle(activeBattle)
            }
        }

        fetchData()
        setInterval(() => {
            fetchData()
        }, 10000)

        return () => { ignore = true; }
    }, []);

    return activeBattle
}

const Battle = () => {
    const activeBattle = useActiveBattle()

    if(!activeBattle) return <p>loading...</p>

    return <div className='battle-container'>
        <LifeBars battleChallangers={activeBattle.battleChallangers} />
        <h3>#{activeBattle.hashtags}</h3>
        <h2>{activeBattle.name}</h2>
        <Fighters battleChallangers={activeBattle.battleChallangers}/>
        <p>{activeBattle.content}!</p>
        <Audience tweets={tweetCountByChallenger(activeBattle)}/>
        {/* <Timeline /> */}
    </div>
}

export default Battle

const LifeBars = ({battleChallangers = []}) => <div className='battle-top'>
    {battleChallangers.map(x => <p key={x.id}>hp: {x.health_point}/{x.max_health_point}</p>)}
</div>

const Fighters = ({battleChallangers = []}) => <div className='battle-fighters'>
    {battleChallangers.map(x => <b key={x.id}>#{x.hashtags}</b>)}
</div>

const Audience = ({tweets = []}) => <div className='battle-audience'>
    {tweets.map((x, i) => <p key={i}>{x} tweets</p>)}
</div>

const tweetCountByChallenger = battle => battle.tweets.reduce((acc, t) => {
    const index = battle.battleChallangers.findIndex(x => t.challanger_id === x.challanger_id)
    acc[index]++
    return acc
}, Array.from({length: battle.battleChallangers.length}).fill(0))

// const Timeline = () => {
//     return <div>
//         timeline
//     </div>
// }
