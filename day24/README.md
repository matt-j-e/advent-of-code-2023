# Day 24 solution

My solution was working with the test data but not with the full input data - it kept returning an answer that was too large.

I tried a few things to fix it. I thought for a time that the numbers were too big for JavaScript to deal with and added the mathjs library that has the capability to deal with numbers larger than 2^53 - 1

I got exactly the same result! 

So it wasn't that the numbers were too big.

I was CONVINCED my maths wasn't at fault. So I looked up other people's solutions. I found [a YouTube video by 0xdf](https://www.youtube.com/watch?v=AP2RsClbIhA&t=958s) with a neat, class-based Python solution. I converted his method to JS. The final for-loop uses some funky Python syntax that I didn't know how to emulate in JS so I just used the same nested for loop structure from my original solution.

**AND THAT'S WHERE THE PROBLEM WAS**

The puzzle needed us to compare every hailstone with every other hailstone. I set up a nested for loop with the outer loop starting at 0 and the inner loop **starting at 1**. I remember when I typed that thinking "is that right? Surely the value of `i` is important here". But I ignored myself.

And that was the problem with my original solution. My maths wasn't faulty. I just needed to start the inner loop at `i + 1` rather than `1`.

**AAARGH!!**

Thankfully I'm a stubborn git and got there in the end.

So I now have 2 working solutions:
- my original
- and a much neater, class-based solution that I borrowed from 0xdf

I really like the class-based solution. I'm going to keep that in my armoury for future reference!
