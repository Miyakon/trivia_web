export async function getTrivia() {
    const res = await fetch('https://opentdb.com/api.php?amount=1')
    const result = await res.json();
    
    return result
}
