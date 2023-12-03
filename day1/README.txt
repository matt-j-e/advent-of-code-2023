The test data set was different for parts one & two, hence the extra file.

To run part one with the test data it's necessary to copy the contents of partOneTest.txt into test.txt

How did I approach this?

Part One:
- We just had to find the first & last integer
- So turn string into array, find first integer
- Reverse array & find first integer
- Used regex to find integers in the strings
- constructed the config value for each string 
- and Bob's your uncle

Part Two:
- The numbers could be in integer or text form
- so couldn't do the reverse array thing (that would reverse the words too)
- started using regex to find location of numbers or number strings
- but this failed because String.search only finds *the first instance*
- and some strings had repeated instances of a given number
- reverted to String.findIndex combined with a while loop to find all instances of each number (or number word)
- then built the config value from the lowest & highest found positions

