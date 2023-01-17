# How to be Awesome With Spreadsheets
## A Tutorial For Awesome Computer Skills

I get a lot of pleasure from my spreadsheet skills. It’s good for doing practical things like managing my personal finances. And it is also gives me a nice temporary feeling of control in an otherwise terrifying and chaotic world. 😓

In this tutorial I am going to build a personal budgeting tool so I can get a better sense of where I’m spending my money. I want to look at my recent transactions, sort all the expenses into categories, and then get a view of how much I’m spending each month on Food, Rent, Utilities, etc.

Here’s a preview to give you a quick sense of what I’m trying to achieve

[https://youtu.be/DhJ2a0fVMiI](https://youtu.be/DhJ2a0fVMiI)

On the way through, I’ll explain some of the more advanced features of Sheets (the spreadsheeting tool in the Google Docs suite), and I’ll call out some of the underlying principles. This will apply to any decent spreadsheet tool, Sheets is just what I’m familiar with.

We’re going to look at: importing data, array formulas, data validation, lookups, conditional statements, filters and pivot tables. In the end we’ll have a sweet interactive tool that gives clear insight into your spending. 

If you want to learn how to be awesome, follow along with my steps. You can play around with my spreadsheet: [make a copy of this one](https://docs.google.com/spreadsheets/d/1AfjXVGGYgy60-nkjZ0oRmXI5lZg9jj7_sEy-AIFUYnw/edit?usp=sharing) and edit it however you like. If you get confused along the way: congratulations, you are learning! Stop and search the web, read the help docs, or ask questions here. By the end of this tutorial, you will be familiar with a powerful set of tools for working with data.

## Part 1: Import data
First thing I want to do is get the data from my bank.

My bank is Transferwise, but just about any online banking site should give you the option to download all your transactions as a “CSV” export. CSV just means comma-separated values; it’s a simple format for storing tables of data.

Then I go to [http://sheets.new](http://sheets.new) to start a new spreadsheet, and click File \> Import to upload the file I got from the bank.

![](01%20Imported%20Data.png)

_Note: if the data formatting looks broken, check that the Locale in the Spreadsheet settings matches your bank. The first time I tried this, the sheet was looking for U.S. date formats but my bank uses European dates._

Most of this data is not useful to me, I just care about the Date, Amount and Merchant (Columns B, C, and N). I’ll leave this imported sheet as it is, and then create a new sheet to focus in on the information I want.

I make a new sheet called Categorised. Then I use a function called [`ARRAYFORMULA`](https://support.google.com/docs/answer/3093275?hl=en) to pull in the columns I want. You can see the formula that I’ve used in C1:  `=ARRAYFORMULA('Imported data’!N:N)`. That populates the whole C column, pulling from the Imported Data sheet.

![](02%20new%20sheet.png)

I’ll explain more about `ARRAYFORMULA` later, but for now all you need to know is that I’ve told it to go to the sheet called ‘Imported data’ and pull in everything in column N. 

_Notice the **design principle** here: in the future, I want to be able to replace the imported data with new transactions. So I’m going to design this sheet so that all the formulas “just work” even when the data changes. In this instance, I’ve told it to grab **everything** in Column B, regardless of the length. When I import new data, that column will grow or shrink, but the formulas will keep working._

---- 

## Part 2: Categorising the transactions
The file I imported has about a hundred Transactions. I want to categorise all of them into a short list of maybe 5 or 10 Categories. 

I have a lot of Transactions from the same Merchant. So rather than going through them all manually, I want to use some computer magic to recognise that, for example, all Transactions from the Merchant “Train Italia” should have the Category “Transport”.

The first step is to make a list of Categories that I can refer back to in different places throughout the spreadsheet. So I make a new sheet called Categories, and start writing a list:

![](03%20categories.png)

Then I create some Category matching rules. If the Merchant is “Unicoop Tirreno” (a supermarket nearby), that should be categorised as “Food”. “Pisa Mover” is a train, so I want to automatically categorise that as “Transport”. So I manually write this list of Merchants and Category Matches:

![](04%20category%20matching.png)

Now, over on the Categorised sheet, I add a new column called Auto Category. I want it to look up my Category Match table, and automatically populate a Category here if it finds a match. To do this I use the [`VLOOKUP`](https://support.google.com/docs/answer/3093318?hl=en) function:

![](05%20vlookup.png)

The formula in D3 is `=VLOOKUP(C2,Categories!C:D,2,false)`. In English, that means _“Look for “Unicoop Tirreno…” in the Category Match table. If you find it, return what you find in the 2nd column”_. It found a match, so it returns the “Food” Category. So far, so good!

Now I want to repeat this for the whole column. To do this, I use our old friend `ARRAYFORMULA`. I think of it as a function to stretch other functions. `VLOOKUP` can only find one cell at a time. But if we wrap it in an `ARRAYFORMULA`, it will stretch and look at the whole column. Notice in Row 7 it has found another match:

![](06%20arrayformula.png)

Unfortunately, it leaves an ugly `#N/A` error whenever it searches for a Merchant that it can’t find in the Category Match table.

_There’s another design principle here: if you hit a problem and you can imagine that a lot of other people have had that problem before you, there’s probably a good solution out there!_

So I searched the web, “google sheets hide formula errors”, and I learned about a function called [`IFERROR`](https://support.google.com/docs/answer/3093304?hl=en). You can use that to tell the formula what to do if it hits an error. In this case, I want it to do nothing, just leave the cell blank. So I update the formula once more, and aaaah that’s better, no ugly error messages:

![](07%20if%20error.png)

The Auto Category column is only used for the Merchants that I frequently buy from. For the rest, I need to add the category manually. 

I create a new column, Manual Categories. But I don’t want to just type out all the categories by hand, I want to [select them from a pre-defined list](https://support.google.com/docs/answer/186103?hl=en&co=GENIE.Platform=Desktop). To do this, I used Data Validation (in the Data menu).

With these Data Validation settings…
![](08%20data%20validation.png)

…all of the cells in column E get this sweet dropdown menu, which is populated by the list I wrote on the Categories sheet.

![](09%20dropdown.png)

If I decide later to add new Categories to the list, they’ll show up on the dropdown menu automagically. If I manually type in a Manual Category that is not on the list, it will warn me with a little red triangle. I know, it’s pretty sick, right?

So now I’ll go thru all my transactions, and categorise them. If I notice the same Merchant keeps showing up in the list, I’ll add a new entry to the CategoryMatch table, and the Auto Category column will update.

It’s annoying having these Categories in two different columns “Auto” and “Manual” though, I want to combine them. So I make a new column called “Category”, and use a couple of cute little functions: [`IF`](https://support.google.com/docs/answer/3093364?hl=en) and [`ISBLANK`](https://support.google.com/docs/answer/3093290?hl=en).  Here’s how it works:  “IF((this statement is true), (do this thing), (otherwise do this other thing))”.

So I tell it: if the Manual Category is blank, give me the Auto Category, otherwise use the Manual Category:

![](10%20if%20is%20blank.png)

And then I want to stretch that formula to cover the whole column, so it’s time for another `ARRAYFORMULA`.

![](11%20array%20formula.png)

Muhahahah! Can you feel the raw power!!!

----   

## Part 3: Monthly Summary

Hokay, so now all the transactions are categorised, I want to see a monthly summary: where am I spending my money?

Enter: [pivot tables](https://support.google.com/docs/answer/1272900?hl=en).

A pivot table is a powerful way to cut different slices thru your data. In this case, I want a table that has a column for each month, and a row for each transaction category.

To do this, I select all Columns A thru F on the Categorised sheet, and then click Data \> Pivot Table. This opens a new sheet, with the Pivot Table Editor. I set Rows: Category, Columns: Date, and Values: Amount.

![](12%20pivot%20table.png)

This is nearly there, but I want one column per month, instead of one column per day like it is currently showing. Easy fixed: right click on one of the dates, and select “Create pivot date group \> Month”. Hey presto:

![](13%20group%20by%20month.png)

So now I can clearly see how much I’m spending on Food every month, which is very useful for my budget. This will help me make more accurate predictions about future spending.

---- 

## Part 4: Category browser

One last thing: I want a view that shows me all the transactions for a given Category. 

I’ll make another sheet called “Category Browser”. I want another one of those sweet dropdown menus, so I can select a Category, and then see all the transactions that match. I use the Data Validation again to get the dropdown.

Then I need the [`FILTER`](https://support.google.com/docs/answer/3093197?hl=en) function, which takes a table, and a condition, and returns all the rows that match the condition.

![](14%20filter.png)

The formula is `=FILTER(Categorised!A:F,Categorised!F:F=A2)`, that means, get all the data from the Categorised sheet (Columns A:F), and show me the rows that match the Category in A2 (“Food”). 

When I change the Category in A2 to “House”, the Browser updates to show me all the Transactions that match “House”

![](15%20change%20category.png)
---- 

That’s it! If you made it this far, you are now officially Awesome With Spreadsheets. Life is basically plain sailing from here on out.

---- 

_I love explaining difficult things in simple terms. You can support my writing by [giving me money on Patreon](http://patreon.com/richdecibels) or just give me claps and shares. This story is published by Richard D. Bartlett with no rights reserved. If you want to reproduce it, you’ll find helpful formats [on my website](http://richdecibels.com/stories/be-awesome). _